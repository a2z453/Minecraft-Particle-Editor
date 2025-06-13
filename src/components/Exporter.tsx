// src/components/Exporter.tsx
import React, { useState } from 'react';
import { useScene } from '../states/SceneContext';
import { Emitter, ParticleProperties } from '../states/types';

const Exporter: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { emitters } = useScene();
  const [exportFormat, setExportFormat] = useState<'commands' | 'json'>('commands');

  const generateParticleCommand = (emitter: Emitter, keyframe?: ParticleProperties & { position: [number, number, number] }) => {
    const props = keyframe || emitter.properties;
    const pos = keyframe ? keyframe.position : emitter.position;
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
      return emitters
        .map((emitter) => {
          if (emitter.keyframes.length > 0) {
            return emitter.keyframes
              .map((kf, index) => {
                const cmd = generateParticleCommand(emitter, { ...kf.properties, position: kf.position });
                return `# Keyframe ${index + 1} at ${kf.time}s\n${cmd}`;
              })
              .join('\n');
          }
          return generateParticleCommand(emitter);
        })
        .join('\n\n');
    } else {
      return JSON.stringify(
        emitters.map((e) => ({
          id: e.id,
          type: e.type,
          position: e.position,
          properties: e.properties,
          keyframes: e.keyframes,
        })),
        null,
        2
      );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(exportContent());
    alert('Exported content copied to clipboard!');
  };

  const handleDownload = () => {
    const content = exportContent();
    const blob = new Blob([content], { type: exportFormat === 'commands' ? 'text/plain' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `particles.${exportFormat === 'commands' ? 'mcfunction' : 'json'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute top-16 left-4 bg-white bg-opacity-80 p-4 rounded shadow-lg z-20">
      <h2 className="font-semibold text-sm mb-2">Export Particles</h2>
      <select
        value={exportFormat}
        onChange={(e) => setExportFormat(e.target.value as 'commands' | 'json')}
        className="w-40 p-1 text-sm border rounded mb-2"
      >
        <option value="commands">Minecraft Commands</option>
        <option value="json">JSON</option>
      </select>
      <div className="flex gap-2">
        <button onClick={handleCopy} className="p-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
          Copy
        </button>
        <button onClick={handleDownload} className="p-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
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