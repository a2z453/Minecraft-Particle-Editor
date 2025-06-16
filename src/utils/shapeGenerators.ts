import { Emitter } from '../states/types';

export function createCircleShape(): Partial<Emitter> {
  return {
    type: 'flame',
    position: { x: 0, y: 1, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    properties: {
      lifetime: 2,
      spawnRate: 20,
      spread: 0.1,
      count: 10,
      velocity: { x: 0, y: 0.2, z: 0 },
      direction: { x: 0, y: 1, z: 0 },
      size: 0.5,
      offset: { x: 1, y: 0, z: 0 },
    },
  };
}

export function createSphereShape(): Partial<Emitter> {
  return {
    type: 'dust',
    position: { x: 0, y: 1, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    properties: {
      lifetime: 3,
      spawnRate: 30,
      spread: 1,
      count: 15,
      velocity: { x: 0, y: 0, z: 0 },
      direction: { x: 0, y: 1, z: 0 },
      size: 0.3,
      color: '#ff0000',
    },
  };
}

export function createSpiralShape(): Partial<Emitter> {
  return {
    type: 'smoke',
    position: { x: 0, y: 1, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    properties: {
      lifetime: 4,
      spawnRate: 25,
      spread: 0.2,
      count: 8,
      velocity: { x: 0, y: 0.3, z: 0 },
      direction: { x: 0, y: 1, z: 0 },
      size: 0.7,
      offset: { x: 0.5, y: 0, z: 0 },
    },
  };
}

export function createStarShape(): Partial<Emitter> {
  return {
    type: 'spark',
    position: { x: 0, y: 1, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    properties: {
      lifetime: 2,
      spawnRate: 15,
      spread: 0.1,
      count: 5,
      velocity: { x: 0, y: 0.1, z: 0 },
      direction: { x: 0, y: 1, z: 0 },
      size: 0.4,
      offset: { x: 0.5, y: 0, z: 0 },
    },
  };
}