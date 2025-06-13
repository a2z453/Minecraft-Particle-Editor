// src/states/types.ts
export interface ParticleProperties {
  lifetime: number;
  velocity: [number, number, number];
  offset: [number, number, number];
  gravity: number;
  spawnRate: number;
  spread: number;
  direction: [number, number, number];
  color?: string;
  size: number;
  fade: [number, number];
  count: number;
  force: boolean;
  blockData?: string;
  itemData?: string;
  transitionColor?: string;
}

export interface Emitter {
  id: string;
  type: string;
  position: [number, number, number];
  properties: ParticleProperties;
}

export interface Keyframe {
  id: string;
  emitterId: string;
  time: number;
  properties: Partial<ParticleProperties>;
}