export interface Emitter {
  id: string;
  type: string;
  color: string;
  position: [number, number, number];
  properties: {
    lifetime: number;
    velocity: number;
    spawnRate: number;
  };
}

export interface Keyframe {
  id: string;
  emitterId: string;
  time: number;
  properties: Partial<Emitter['properties']>;
}