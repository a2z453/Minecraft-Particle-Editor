import React from 'react';
import { useScene } from '../state/SceneContext';
import { createCircleShape, createSphereShape, createSpiralShape } from '../utils/shapeGenerators';

export default function Toolbar() {
  const { addEmitter } = useScene();

  const handleAddEmitter = () => {
    addEmitter({
      type: 'flame',
      position: [0, 1, 0],
      properties: { lifetime: 2, velocity: 0, spawnRate: 10 }
    });
  };

  return (
    <div className="space-y-4">
      <button onClick={handleAddEmitter} className="w-full p-2 bg-blue-500 text-white rounded shadow">
        + Add Emitter
      </button>
      <h2 className="font-semibold">Shape Presets</h2>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => addEmitter(createCircleShape())} className="p-2 bg-white rounded shadow">Circle</button>
        <button onClick={() => addEmitter(createSphereShape())} className="p-2 bg-white rounded shadow">Sphere</button>
        <button onClick={() => addEmitter(createSpiralShape())} className="p-2 bg-white rounded shadow">Spiral</button>
        <button onClick={() => addEmitter({ custom: true })} className="p-2 bg-white rounded shadow">Custom</button>
      </div>
    </div>
);
}