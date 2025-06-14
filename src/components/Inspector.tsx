import React from 'react';
import { useScene } from '../states/SceneContext';
import { Leva, useControls } from 'leva';
import { PARTICLE_DATA } from '../states/types';

const colorableParticles = Object.keys(PARTICLE_DATA).filter((type) => PARTICLE_DATA[type].supportsColor);
const transitionColorParticles = Object.keys(PARTICLE_DATA).filter((type) => PARTICLE_DATA[type].supportsTransitionColor);
const blockParticles = Object.keys(PARTICLE_DATA).filter((type) => PARTICLE_DATA[type].supportsBlockData);
const itemParticles = Object.keys(PARTICLE_DATA).filter((type) => PARTICLE_DATA[type].supportsItemData);

export default function Inspector() {
  const { selectedEmitter, selectedKeyframeId, updateEmitter, emitters, updateKeyframe } = useScene();

  if (!selectedEmitter) return <div>Select an emitter or keyframe to view properties</div>;

  const selectedKeyframe = selectedEmitter.keyframes.find((kf) => kf.id === selectedKeyframeId);

  const controls = selectedKeyframe
    ? {
        time: { value: selectedKeyframe.time, min: 0, max: 60, step: 0.1 },
        position: { value: selectedKeyframe.position, step: 0.1 },
        lifetime: { value: selectedKeyframe.properties.lifetime || 2, min: 0, max: 10, step: 0.1 },
        velocity: { value: selectedKeyframe.properties.velocity || [0, 0, 0], step: 0.1 },
        offset: { value: selectedKeyframe.properties.offset || [0, 0, 0], step: 0.1 },
        gravity: { value: selectedKeyframe.properties.gravity || 0, min: -1, max: 1, step: 0.01 },
        spawnRate: { value: selectedKeyframe.properties.spawnRate || 10, min: 1, max: 100, step: 1 },
        spread: { value: selectedKeyframe.properties.spread || 0.1, min: 0, max: 5, step: 0.1 },
        direction: { value: selectedKeyframe.properties.direction || [0, 1, 0], step: 0.1 },
        ...(colorableParticles.includes(selectedEmitter.type) && {
          color: selectedKeyframe.properties.color || '#ffffff',
        }),
        size: { value: selectedKeyframe.properties.size || 1, min: 0.1, max: 10, step: 0.1 },
        fade: { value: selectedKeyframe.properties.fade || [0, 0], step: 0.1 },
        count: { value: selectedKeyframe.properties.count || 1, min: 1, max: 100, step: 1 },
        force: selectedKeyframe.properties.force || false,
        ...(blockParticles.includes(selectedEmitter.type) && {
          blockData: selectedKeyframe.properties.blockData || 'minecraft:stone',
        }),
        ...(itemParticles.includes(selectedEmitter.type) && {
          itemData: selectedKeyframe.properties.itemData || 'minecraft:apple',
        }),
        ...(transitionColorParticles.includes(selectedEmitter.type) && {
          transitionColor: selectedKeyframe.properties.transitionColor || '#ffffff',
        }),
        customTexture: { value: selectedKeyframe.properties.customTexture || '', type: 'file' },
      }
    : {
        type: {
          value: selectedEmitter.type,
          options: Object.keys(PARTICLE_DATA),
        },
        position: { value: selectedEmitter.position, step: 0.1 },
        rotation: { value: selectedEmitter.rotation, step: 1 },
        scale: { value: selectedEmitter.scale, step: 0.1 },
        lifetime: { value: selectedEmitter.properties.lifetime, min: 0, max: 10, step: 0.1 },
        velocity: { value: selectedEmitter.properties.velocity, step: 0.1 },
        offset: { value: selectedEmitter.properties.offset, step: 0.1 },
        gravity: { value: selectedEmitter.properties.gravity, min: -1, max: 1, step: 0.01 },
        spawnRate: { value: selectedEmitter.properties.spawnRate, min: 1, max: 100, step: 1 },
        spread: { value: selectedEmitter.properties.spread, min: 0, max: 5, step: 0.1 },
        direction: { value: selectedEmitter.properties.direction, step: 0.1 },
        ...(colorableParticles.includes(selectedEmitter.type) && {
          color: selectedEmitter.properties.color || '#ffffff',
        }),
        size: { value: selectedEmitter.properties.size, min: 0.1, max: 10, step: 0.1 },
        fade: { value: selectedEmitter.properties.fade, step: 0.1 },
        count: { value: selectedEmitter.properties.count, min: 1, max: 100, step: 1 },
        force: selectedEmitter.properties.force,
        ...(blockParticles.includes(selectedEmitter.type) && {
          blockData: selectedEmitter.properties.blockData || 'minecraft:stone',
        }),
        ...(itemParticles.includes(selectedEmitter.type) && {
          itemData: selectedEmitter.properties.itemData || 'minecraft:apple',
        }),
        ...(transitionColorParticles.includes(selectedEmitter.type) && {
          transitionColor: selectedEmitter.properties.transitionColor || '#ffffff',
        }),
        customTexture: { value: selectedEmitter.properties.customTexture || '', type: 'file' },
      };

  const [values] = useControls(() => controls);

  React.useEffect(() => {
    if (selectedKeyframe) {
      updateKeyframe(selectedEmitter.id, selectedKeyframe.id, {
        time: values.time,
        position: values.position,
        properties: {
          lifetime: values.lifetime,
          velocity: values.velocity,
          offset: values.offset,
          gravity: values.gravity,
          spawnRate: values.spawnRate,
          spread: values.spread,
          direction: values.direction,
          ...(colorableParticles.includes(selectedEmitter.type) && { color: values.color }),
          size: values.size,
          fade: values.fade,
          count: values.count,
          force: values.force,
          ...(blockParticles.includes(selectedEmitter.type) && { blockData: values.blockData }),
          ...(itemParticles.includes(selectedEmitter.type) && { itemData: values.itemData }),
          ...(transitionColorParticles.includes(selectedEmitter.type) && { transitionColor: values.transitionColor }),
          customTexture: values.customTexture,
        },
      });
    } else {
      updateEmitter(selectedEmitter.id, {
        type: values.type,
        position: values.position,
        rotation: values.rotation,
        scale: values.scale,
        properties: {
          ...selectedEmitter.properties,
          lifetime: values.lifetime,
          velocity: values.velocity,
          offset: values.offset,
          gravity: values.gravity,
          spawnRate: values.spawnRate,
          spread: values.spread,
          direction: values.direction,
          ...(colorableParticles.includes(values.type) && { color: values.color }),
          size: values.size,
          fade: values.fade,
          count: values.count,
          force: values.force,
          ...(blockParticles.includes(values.type) && { blockData: values.blockData }),
          ...(itemParticles.includes(values.type) && { itemData: values.itemData }),
          ...(transitionColorParticles.includes(values.type) && { transitionColor: values.transitionColor }),
          customTexture: values.customTexture,
        },
      });
    }
  }, [values]);

  return (
    <div className="mt-4">
      <h2 className="font-semibold">Inspector</h2>
      <Leva hideCopyButton />
    </div>
  );
}