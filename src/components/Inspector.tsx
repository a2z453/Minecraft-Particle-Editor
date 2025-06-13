// src/components/Inspector.tsx
import React from 'react';
import { useScene } from '../states/SceneContext';
import { Leva, useControls } from 'leva';
import { PARTICLE_DATA } from './Viewport';

const colorableParticles = Object.keys(PARTICLE_DATA).filter((type) => PARTICLE_DATA[type].supportsColor);
const transitionColorParticles = Object.keys(PARTICLE_DATA).filter((type) => PARTICLE_DATA[type].supportsTransitionColor);
const blockParticles = Object.keys(PARTICLE_DATA).filter((type) => PARTICLE_DATA[type].supportsBlockData);
const itemParticles = Object.keys(PARTICLE_DATA).filter((type) => PARTICLE_DATA[type].supportsItemData);

export default function Inspector() {
  const { selectedEmitter, updateEmitter } = useScene();

  if (!selectedEmitter) return <div>Select an emitter to view properties</div>;

  const controls = {
    type: {
      value: selectedEmitter.type,
      options: Object.keys(PARTICLE_DATA),
    },
    position: { value: selectedEmitter.position, step: 0.1 },
    ...(colorableParticles.includes(selectedEmitter.type) && {
      color: selectedEmitter.properties.color || '#ffffff',
    }),
    ...(transitionColorParticles.includes(selectedEmitter.type) && {
      transitionColor: selectedEmitter.properties.transitionColor || '#ffffff',
    }),
    lifetime: { value: selectedEmitter.properties.lifetime, min: 0, max: 10, step: 0.1 },
    velocity: { value: selectedEmitter.properties.velocity, step: 0.1 },
    offset: { value: selectedEmitter.properties.offset, step: 0.1 },
    gravity: { value: selectedEmitter.properties.gravity, min: -1, max: 1, step: 0.01 },
    spawnRate: { value: selectedEmitter.properties.spawnRate, min: 1, max: 100, step: 1 },
    spread: { value: selectedEmitter.properties.spread, min: 0, max: 5, step: 0.1 },
    size: { value: selectedEmitter.properties.size, min: 0.1, max: 10, step: 0.1 },
    count: { value: selectedEmitter.properties.count, min: 1, max: 100, step: 1 },
    force: selectedEmitter.properties.force,
    ...(blockParticles.includes(selectedEmitter.type) && {
      blockData: selectedEmitter.properties.blockData || 'minecraft:stone',
    }),
    ...(itemParticles.includes(selectedEmitter.type) && {
      itemData: selectedEmitter.properties.itemData || 'minecraft:apple',
    }),
  };

  const [values] = useControls(() => controls);

  React.useEffect(() => {
    updateEmitter(selectedEmitter.id, {
      type: values.type,
      position: values.position,
      properties: {
        ...selectedEmitter.properties,
        lifetime: values.lifetime,
        velocity: values.velocity,
        offset: values.offset,
        gravity: values.gravity,
        spawnRate: values.spawnRate,
        spread: values.spread,
        size: values.size,
        count: values.count,
        force: values.force,
        ...(colorableParticles.includes(values.type) && { color: values.color }),
        ...(transitionColorParticles.includes(values.type) && { transitionColor: values.transitionColor }),
        ...(blockParticles.includes(values.type) && { blockData: values.blockData }),
        ...(itemParticles.includes(values.type) && { itemData: values.itemData }),
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