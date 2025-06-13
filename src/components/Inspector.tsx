// src/components/Inspector.tsx
import React from "react";
import { useScene } from "../states/SceneContext";
import { Leva, useControls } from "leva";

export default function Inspector() {
  const { selectedEmitter, updateEmitter } = useScene();

  if (!selectedEmitter) return <div>Select an emitter to view properties</div>;

  const [values, setValues] = useControls(() => ({
    type: {
      value: selectedEmitter.type,
      options: ["flame", "smoke", "dust", "crit", "sweep_attack", "dust_color_transition"],
    },
    position: { value: selectedEmitter.position, step: 0.1 },
    color: selectedEmitter.properties.color,
    lifetime: { value: selectedEmitter.properties.lifetime, min: 0, max: 10, step: 0.1 },
    velocity: { value: selectedEmitter.properties.velocity, step: 0.1 },
    spawnRate: { value: selectedEmitter.properties.spawnRate, min: 1, max: 100, step: 1 },
    spread: { value: selectedEmitter.properties.spread, min: 0, max: 5, step: 0.1 },
    gravity: { value: selectedEmitter.properties.gravity, min: -1, max: 1, step: 0.01 },
  }));

  React.useEffect(() => {
    updateEmitter(selectedEmitter.id, {
      type: values.type,
      position: values.position,
      properties: {
        ...selectedEmitter.properties,
        color: values.color,
        lifetime: values.lifetime,
        velocity: values.velocity,
        spawnRate: values.spawnRate,
        spread: values.spread,
        gravity: values.gravity,
      },
    });
  }, [values]);

  return (
    <div className="mt-4">
      <h2 className="font-semibold">Inspector</h2>
      <Leva hideCopyButton />
    </div>
  );
}