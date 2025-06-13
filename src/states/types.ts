// src/states/types.ts
export interface ParticleProperties {
  lifetime: number;              // Duration in seconds
  velocity: [number, number, number]; // Movement speed (x, y, z)
  offset: [number, number, number];   // Initial spawn offset
  gravity: number;               // Downward acceleration
  spawnRate: number;             // Particles per second
  spread: number;                // Random spread radius
  direction: [number, number, number]; // Emission direction
  color: string;                 // Hex color (e.g., "#FF0000")
  size: number;                  // Particle size
  fade: [number, number];        // Fade-in/out times
  count: number;                 // Particles per emission
  force: boolean;                // Force rendering (visible through walls)
}

export interface Emitter {
  id: string;
  type: string;                  // e.g., "flame", "dust", "crit"
  position: [number, number, number];
  properties: ParticleProperties;
}

export interface Keyframe {
  id: string;
  emitterId: string;
  time: number;                  // Time in seconds
  properties: Partial<ParticleProperties>; // Properties to animate
}