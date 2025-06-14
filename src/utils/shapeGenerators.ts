import { Emitter } from '../states/types';

export function createCircleShape(): Partial<Emitter> {
  return {
    type: 'flame',
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    properties: {
      lifetime: 2,
      spawnRate: 20,
      spread: 0.1,
      count: 10,
      velocity: [0, 0.2, 0],
      direction: [0, 1, 0],
      size: 0.5,
      offset: [1, 0, 0], // Circle radius
    },
  };
}

export function createSphereShape(): Partial<Emitter> {
  return {
    type: 'dust',
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    properties: {
      lifetime: 3,
      spawnRate: 30,
      spread: 1,
      count: 15,
      velocity: [0, 0, 0],
      direction: [0, 1, 0],
      size: 0.3,
      color: '#ff0000',
    },
  };
}

export function createSpiralShape(): Partial<Emitter> {
  return {
    type: 'smoke',
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    properties: {
      lifetime: 4,
      spawnRate: 25,
      spread: 0.2,
      count: 8,
      velocity: [0, 0.3, 0],
      direction: [0, 1, 0],
      size: 0.7,
      offset: [0.5, 0, 0],
    },
  };
}

export function createStarShape(): Partial<Emitter> {
  return {
    type: 'spark',
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    properties: {
      lifetime: 2,
      spawnRate: 15,
      spread: 0.1,
      count: 5,
      velocity: [0, 0.1, 0],
      direction: [0, 1, 0],
      size: 0.4,
      offset: [0.5, 0, 0],
    },
  };
}