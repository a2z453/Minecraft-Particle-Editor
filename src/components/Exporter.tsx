import React, { useState } from 'react';
import { useScene } from '../states/SceneContext';
import { generateSpigotCode } from './exporters/CodeExport';
import { Emitter } from '../states/types';
import * as THREE from 'three';

const Exporter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { emitters } = useScene();
  const [exportFormat, setExportFormat] = useState<'commands' | 'plugin' | 'json'>('json');

  const generateParticleCommand = (emitter: Emitter, props: any, pos: { x: number; y: number; z: number }) => {
    const color = new THREE.Color(props.color || '#ffffff');
    const transitionColor = new THREE.Color(props.transitionColor || '#ffffff');
    let particle = emitter.type;

    if (props.blockData && ['block', 'block_marker', 'falling_dust'].includes(emitter.type)) {
      particle += ` ${props.blockData}`;
    } else if (props.itemData && ['item', 'item_slime', 'item_snowball'].includes(emitter.type)) {
      particle += ` ${props.itemData}`;
    } else if (emitter.type === 'dust' && props.color) {
      particle += ` ${color.r} ${color.g} ${color.b} ${props.size || 1}`;
    } else if (emitter.type === 'dust_color_transition' && props.color && props.transitionColor) {
      particle += ` ${color.r} ${color.g} ${color.b} ${props.size || 1} ${transitionColor.r} ${transitionColor.g} ${transitionColor.b}`;
    }

    return `/particle ${particle} ${pos.x} ${pos.y} ${pos.z} ${props.spread || 0} ${props.spread || 0} ${props.spread || 0} ${props.velocity.x || 0} ${props.velocity.y || 0} ${props.velocity.z || 0} ${props.count || 1} ${props.force ? 'force' : 'normal'}`;
  };

  const exportContent = () => {
    const date = new Date().toISOString().split('T')[0]; // e.g., 2025-06-16
    if (exportFormat === 'json') {
      return JSON.stringify(emitters, null, 2);
    } else if (exportFormat === 'commands') {
      const commands: string[] = [];
      emitters.forEach((emitter) => {
        if (emitter.keyframes.length > 0) {
          emitter.keyframes.forEach((kf, index) => {
            const delay = index === 0 ? 0 : Math.floor((kf.time - emitter.keyframes[index - 1].time) * 20);
            commands.push(`# Time: ${kf.time}s - Generated on ${date}`);
            commands.push(generateParticleCommand(emitter, kf.properties, kf.position));
            if (delay > 0) commands.push(`schedule function particle:run ${delay}t append`);
          });
        } else {
          commands.push(`# Generated on ${date}`);
          commands.push(generateParticleCommand(emitter, emitter.properties, emitter.position));
        }
      });
      return commands.join('\n');
    } else if (exportFormat === 'plugin') {
      return generateSpigotCode(emitters, date);
    }
    return '';
  };

  const handleDownload = () => {
    const content = exportContent();
    const blob = new Blob([content], { type: exportFormat === 'json' ? 'application/json' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `particles_${date}.${exportFormat === 'commands' ? 'mcfunction' : exportFormat === 'plugin' ? 'java' : 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Export Options</h2>
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value as 'commands' | 'plugin' | 'json')}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="json">JSON Project</option>
          <option value="commands">Minecraft Commands</option>
          <option value="plugin">Spigot Plugin</option>
        </select>
        <button
          onClick={handleDownload}
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Download
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 p-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Exporter;