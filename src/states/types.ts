// src/states/types.ts
export interface Keyframe {
  time: number; // Time in seconds
  position: [number, number, number];
  properties: Partial<ParticleProperties>;
}

export interface ParticleProperties {
  lifetime: number; // Seconds, Infinity for persistent particles
  velocity: [number, number, number]; // Motion per second
  offset: [number, number, number]; // Spawn offset
  gravity: number; // Downward acceleration
  spawnRate: number; // Particles per second
  spread: number; // Random spawn radius
  direction: [number, number, number]; // Normalized direction vector
  color?: string; // Hex color (e.g., "#FF0000")
  size: number; // Particle scale
  fade: [number, number]; // Fade in/out times
  count: number; // Number of particles
  force: boolean; // Force mode for particles
  blockData?: string; // e.g., "minecraft:stone"
  itemData?: string; // e.g., "minecraft:apple"
  transitionColor?: string; // For dust_color_transition
}

export interface Emitter {
  id: string;
  type: string; // Particle type (e.g., "flame")
  position: [number, number, number]; // Emitter position
  properties: ParticleProperties;
  keyframes: Keyframe[]; // Animation keyframes
}

export const PARTICLE_DATA: {
  [key: string]: Partial<ParticleProperties> & {
    supportsColor?: boolean;
    supportsTransitionColor?: boolean;
    supportsBlockData?: boolean;
    supportsItemData?: boolean;
  };
} = {
  ambient_entity_effect: { lifetime: Infinity, spawnRate: 5, spread: 0.5, size: 0.3, supportsColor: true },
  angry_villager: { lifetime: Infinity, spawnRate: 1, spread: 0.2, size: 0.4 },
  ash: { lifetime: Infinity, spawnRate: 10, gravity: 0.05, spread: 1, size: 0.2 },
  barrier: { lifetime: Infinity, spawnRate: 1, spread: 0.1, size: 0.5 },
  block: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3, supportsBlockData: true },
  block_marker: { lifetime: Infinity, spawnRate: 1, spread: 0.1, size: 0.5, supportsBlockData: true },
  bubble: { lifetime: Infinity, spawnRate: 5, spread: 0.2, size: 0.2 },
  bubble_column_up: { lifetime: Infinity, spawnRate: 10, spread: 0.3, size: 0.2 },
  bubble_pop: { lifetime: Infinity, spawnRate: 5, spread: 0.2, size: 0.2 },
  campfire_cosy_smoke: { lifetime: Infinity, spawnRate: 3, gravity: 0.01, spread: 0.5, size: 0.5 },
  campfire_signal_smoke: { lifetime: Infinity, spawnRate: 3, gravity: 0.01, spread: 0.5, size: 0.5 },
  cherry_leaves: { lifetime: Infinity, spawnRate: 5, gravity: 0.02, spread: 0.5, size: 0.3 },
  cloud: { lifetime: Infinity, spawnRate: 3, spread: 0.5, size: 0.5 },
  composter: { lifetime: Infinity, spawnRate: 5, spread: 0.2, size: 0.2 },
  crimson_spore: { lifetime: Infinity, spawnRate: 10, spread: 1, size: 0.2 },
  crit: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  current_down: { lifetime: Infinity, spawnRate: 5, spread: 0.2, size: 0.2 },
  damage_indicator: { lifetime: Infinity, spawnRate: 3, spread: 0.3, size: 0.4 },
  dolphin: { lifetime: Infinity, spawnRate: 5, spread: 0.2, size: 0.2 },
  dragon_breath: { lifetime: Infinity, spawnRate: 5, spread: 0.5, size: 0.3 },
  dripping_dripstone_lava: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  dripping_dripstone_water: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  dripping_honey: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  dripping_lava: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  dripping_obsidian_tear: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  dripping_water: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  dust: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.2, supportsColor: true },
  dust_color_transition: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.2, supportsColor: true, supportsTransitionColor: true },
  effect: { lifetime: Infinity, spawnRate: 5, spread: 0.5, size: 0.3, supportsColor: true },
  elder_guardian: { lifetime: Infinity, spawnRate: 1, spread: 0.5, size: 0.5 },
  electric_spark: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.2 },
  enchant: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  enchanted_hit: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  end_rod: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.2 },
  entity_effect: { lifetime: Infinity, spawnRate: 5, spread: 0.5, size: 0.3, supportsColor: true },
  explosion: { lifetime: Infinity, spawnRate: 3, spread: 0.5, size: 0.5 },
  explosion_emitter: { lifetime: Infinity, spawnRate: 1, spread: 0.5, size: 0.5 },
  falling_dripstone_lava: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_dripstone_water: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_dust: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3, supportsBlockData: true },
  falling_honey: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_lava: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_nectar: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_obsidian_tear: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_spore_blossom: { lifetime: Infinity, spawnRate: 5, spread: 0.5, size: 0.2 },
  falling_water: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  firework: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  fishing: { lifetime: Infinity, spawnRate: 5, spread: 0.2, size: 0.2 },
  flame: { lifetime: Infinity, spawnRate: 5, spread: 0.2, size: 0.2 },
  flash: { lifetime: Infinity, spawnRate: 1, spread: 0.1, size: 0.5 },
  glow: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.2 },
  glow_squid_ink: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  happy_villager: { lifetime: Infinity, spawnRate: 3, spread: 0.3, size: 0.3 },
  heart: { lifetime: Infinity, spawnRate: 3, spread: 0.3, size: 0.3 },
  instant_effect: { lifetime: Infinity, spawnRate: 5, spread: 0.5, size: 0.3, supportsColor: true },
  item: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3, supportsItemData: true },
  item_slime: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3, supportsItemData: true },
  item_snowball: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3, supportsItemData: true },
  landing_honey: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  landing_lava: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  landing_obsidian_tear: { lifetime: Infinity, spawnRate: 2, spread: 0.1, size: 0.2 },
  large_smoke: { lifetime: Infinity, spawnRate: 3, spread: 0.5, size: 0.5 },
  lava: { lifetime: Infinity, spawnRate: 5, spread: 0.2, size: 0.2 },
  mycelium: { lifetime: Infinity, spawnRate: 5, spread: 0.5, size: 0.2 },
  nautilus: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  note: { lifetime: Infinity, spawnRate: 3, spread: 0.3, size: 0.3 },
  poof: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  portal: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  rain: { lifetime: Infinity, spawnRate: 10, spread: 0.5, size: 0.2 },
  reverse_portal: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  sculk_charge: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  sculk_charge_pop: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  sculk_soul: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  shriek: { lifetime: Infinity, spawnRate: 3, spread: 0.3, size: 0.4 },
  smoke: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  sneeze: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  snowflake: { lifetime: Infinity, spawnRate: 5, spread: 0.5, size: 0.2 },
  sonic_boom: { lifetime: Infinity, spawnRate: 1, spread: 0.5, size: 0.5 },
  soul: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  soul_fire_flame: { lifetime: Infinity, spawnRate: 5, spread: 0.2, size: 0.2 },
  spit: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  splash: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  spore_blossom_air: { lifetime: Infinity, spawnRate: 10, spread: 0.5, size: 0.2 },
  squid_ink: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  sweep_attack: { lifetime: Infinity, spawnRate: 3, spread: 0.3, size: 0.4 },
  totem_of_undying: { lifetime: Infinity, spawnRate: 5, spread: 0.5, size: 0.3 },
  trial_omen: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  trial_spawner_detection: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  underwater: { lifetime: Infinity, spawnRate: 10, spread: 0.5, size: 0.2 },
  vault_connection: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  vibration: { lifetime: Infinity, spawnRate: 3, spread: 0.3, size: 0.3 },
  warped_spore: { lifetime: Infinity, spawnRate: 10, spread: 0.5, size: 0.2 },
  wax_off: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  wax_on: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  white_ash: { lifetime: Infinity, spawnRate: 10, spread: 0.5, size: 0.2 },
  witch: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  gust: { lifetime: Infinity, spawnRate: 10, spread: 0.5, size: 0.3, gravity: 0.05 },
  small_gust: { lifetime: Infinity, spawnRate: 8, spread: 0.3, size: 0.2, gravity: 0.03 },
  infested: { lifetime: Infinity, spawnRate: 5, spread: 0.2, size: 0.3 },
  ominous_spawning: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  raid_omen: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
  trial_spawner_detection_ominous: { lifetime: Infinity, spawnRate: 5, spread: 0.3, size: 0.3 },
};