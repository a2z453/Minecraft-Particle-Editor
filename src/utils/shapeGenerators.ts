import { Emitter } from '../states/types';

export function createCircleShape(): Partial<Emitter> {
  return {
    type: 'dust',
    color: '#ff0000',
    position: [0,1,0],
    properties: { lifetime: 2, velocity: 1, spawnRate: 20 },
    // add extra field `shape: { type: 'circle', radius: 2 }` if needed
  };
}

export function createSphereShape(): Partial<Emitter> {
  return {
    type: 'smoke',
    color: '#cccccc',
    position: [0,1,0],
    properties: { lifetime: 3, velocity: 0.5, spawnRate: 15 },
  };
}

export function createSpiralShape(): Partial<Emitter> {
  return {
    type: 'crit',
    color: '#00ff00',
    position: [0,1,0],
    properties: { lifetime: 2, velocity: 2, spawnRate: 25 },
  };
}