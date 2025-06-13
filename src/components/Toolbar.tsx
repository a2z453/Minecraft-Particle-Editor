// src/components/Toolbar.tsx
import React from "react";
import { useScene } from "../states/SceneContext";
import { createCircleShape, createSphereShape, createSpiralShape } from "../utils/shapeGenerators";

const particleTypes = ["flame", "smoke", "dust", "crit", "sweep_attack", "dust_color_transition"];

export default function Toolbar() {
  const { addEmitter } = useScene();

  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Add Emitter</h2>
      <select
        onChange={(e) => addEmitter({ type: e.target.value, position: [0, 1, 0] })}
        className="w-full p-2 border rounded"
      >
        {particleTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <h2 className="font-semibold">Shape Presets</h2>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => addEmitter(createCircleShape())} className="p-2 bg-white rounded shadow">Circle</button>
        <button onClick={() => addEmitter(createSphereShape())} className="p-2 bg-white rounded shadow">Sphere</button>
        <button onClick={() => addEmitter(createSpiralShape())} className="p-2 bg-white rounded shadow">Spiral</button>
      </div>
    </div>
  );
}