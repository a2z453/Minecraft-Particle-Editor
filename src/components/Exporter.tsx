import React, { useState } from 'react';
import { useScene } from '../states/SceneContext';
import { generateSpigotCode } from './exporters/CodeExport';
import { Emitter } from '../states/types';
import * as THREE from 'three';

const Exporter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { emitters } = useScene();
  const [exportFormat, setExportFormat] = useState<'commands' | 'plugin' | 'json'>('commands');

  const generateParticleCommand = (emitter: Emitter, props: any, pos: [number, number, number]) => {
    const [x, y, z] = pos;
    const [vx, vy, vz] = props.velocity || [0, 0, 0];
    const count = props.count || 1;
    const spread = props.spread || 0;
    const force = props.force ? 'force' : 'normal';
    let particle = emitter.type;

    if (props.blockData && ['block', 'block_marker', 'falling_dust'].includes(emitter.type)) {
      particle += ` ${props.blockData}`;
    } else if (props.itemData && ['item', 'item_slime', 'item_snowball'].includes(emitter.type)) {
      particle += ` ${props.itemData}`;
    } else if (emitter.type === 'dust' && props.color) {
      const color = new THREE.Color(props.color);
      particle += ` ${color.r} ${color.g} ${color.b} ${props.size || 1}`;
    } else if (emitter.type === 'dust_color_transition' && props.color && props.transitionColor) {
      const color = new THREE.Color(props.color);
      const transitionColor = new THREE.Color(props.transitionColor);
      particle += ` ${color.r} ${color.g} ${color.b} ${props.size || 1} ${transitionColor.r} ${transitionColor.g} ${transitionColor.b}`;
    }

    return `/particle ${particle} ${x} ${y} ${z} ${spread} ${spread} ${spread} ${vx} ${vy} ${vz} ${count} ${force}`;
  };

  const exportContent = () => {
    if (exportFormat === 'commands') {
      const commands: string[] = [];
      emitters.forEach((emitter) => {
        if (emitter.keyframes.length > 0) {
          emitter.keyframes.forEach((kf, index) => {
            const delay = index === 0 ? 0 : Math.floor((kf.time - emitter.keyframes[index - 1].time) * 20);
            commands.push(`# Time: ${kf.time}s`);
            commands.push(generateParticleCommand(emitter, kf.properties, kf.position));
            if (delay > 0) commands.push(`schedule function particle:run ${delay}t append`);
          });
        } else {
          commands.push(generateParticleCommand(emitter, emitter.properties, emitter.position));
        }
      });
      return commands.join('\n');
    } else if (exportFormat === 'plugin') {
      return generateSpigotCode(emitters);
    } else {
      return JSON.stringify(emitters, null, 2);
    }
  };

  const handleDownload = () => {
    const content = exportContent();
    const blob = new Blob([content], { type: exportFormat === 'json' ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `particles.${exportFormat === 'commands' ? 'mcfunction' : exportFormat === 'plugin' ? 'java' : 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute top-16 right-4 bg-white bg-opacity-80 p-4 rounded shadow-lg z-20">
      <h2 className="font-semibold text-sm mb-2">Export Particles</h2>
      <select
        value={exportFormat}
        onChange={(e) => setExportFormat(e.target.value as 'commands' | 'plugin' | 'json')}
        className="w-40 p-1 text-sm border rounded mb-2"
      >
        <option value="commands">Minecraft Commands</option>
        <option value="plugin">Spigot Plugin</option>
        <option value="json">JSON Project</option>
      </select>
      <div className="flex gap-2">
        <button onClick={handleDownload} className="p-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
          Download
        </button>
        <button onClick={onClose} className="p-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
          Close
        </button>
      </div>
    </div>
  );
};

export default Exporter;