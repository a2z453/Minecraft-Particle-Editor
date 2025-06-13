// src/utils/shapeGenerators.ts
import { Emitter } from '../states/types';

export function createCircleShape(): Partial<Emitter> {
  return {
    type: 'flame',
    position: [0, 1, 0],
    properties: {
      lifetime: 2,
      spawnRate: 20,
      spread: 0.1,
      count: 10,
      velocity: [0, 0.2, 0],
      direction: [0, 1, 0],
      size: 0.5,
      // Circle pattern: particles spawn in a ring
      offset: [1, 0, 0], // Starting offset
    },
  };
}

export function createSphereShape(): Partial<Emitter> {
  return {
    type: 'dust',
    position: [0, 1, 0],
    properties: {
      lifetime: 3,
      spawnRate: 30,
      spread: 1,
      count: 15,
      velocity: [0, 0, 0],
      direction: [0, 1, 0],
      size: 0.3,
      color: '#ff0000',
      // Sphere pattern: particles spread evenly in all directions
    },
  };
}

export function createSpiralShape(): Partial<Emitter> {
  return {
    type: 'smoke',
    position: [0, 1, 0],
    properties: {
      lifetime: 4,
      spawnRate: 25,
      spread: 0.2,
      count: 8,
      velocity: [0, 0.3, 0],
      direction: [0, 1, 0],
      size: 0.7,
      // Spiral pattern: particles rotate around Y-axis
      offset: [0.5, 0, 0],
    },
  };
}