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

export const PARTICLE_DATA: { [key: string]: Partial<ParticleProperties> & { supportsColor?: boolean; supportsTransitionColor?: boolean; supportsBlockData?: boolean; supportsItemData?: boolean } } = {
  ambient_entity_effect: { lifetime: 1, spawnRate: 5, spread: 0.5, supportsColor: true },
  angry_villager: { lifetime: 1, spawnRate: 1, spread: 0.2 },
  ash: { lifetime: 3, spawnRate: 10, gravity: 0.05, spread: 1 },
  barrier: { lifetime: 1, spawnRate: 1, spread: 0 },
  block: { lifetime: 1, spawnRate: 10, spread: 0.5, blockData: 'minecraft:stone', supportsBlockData: true },
  block_marker: { lifetime: 1, spawnRate: 1, blockData: 'minecraft:stone', supportsBlockData: true },
  bubble: { lifetime: 2, spawnRate: 5, velocity: [0, 0.2, 0], spread: 0.3 },
  bubble_column_up: { lifetime: 2, spawnRate: 10, velocity: [0, 0.5, 0], spread: 0.5 },
  bubble_pop: { lifetime: 0.5, spawnRate: 5, spread: 0.2 },
  campfire_cosy_smoke: { lifetime: 10, spawnRate: 2, velocity: [0, 0.1, 0], gravity: 0.01, spread: 0.5 },
  campfire_signal_smoke: { lifetime: 15, spawnRate: 2, velocity: [0, 0.15, 0], gravity: 0.01, spread: 1 },
  cherry_leaves: { lifetime: 5, spawnRate: 3, gravity: 0.02, spread: 0.8 },
  cloud: { lifetime: 3, spawnRate: 5, spread: 1 },
  composter: { lifetime: 1, spawnRate: 3, spread: 0.2 },
  crimson_spore: { lifetime: 5, spawnRate: 5, gravity: 0.01, spread: 1 },
  crit: { lifetime: 1, spawnRate: 10, spread: 0.5, velocity: [0.5, 0.5, 0.5] },
  current_down: { lifetime: 2, spawnRate: 5, velocity: [0, -0.2, 0], spread: 0.3 },
  damage_indicator: { lifetime: 1, spawnRate: 3, spread: 0.3 },
  dolphin: { lifetime: 2, spawnRate: 5, spread: 0.5 },
  dragon_breath: { lifetime: 3, spawnRate: 10, spread: 0.5, velocity: [0, 0.1, 0] },
  dripping_dripstone_lava: { lifetime: 2, spawnRate: 1, gravity: 0.1, spread: 0.1 },
  dripping_dripstone_water: { lifetime: 2, spawnRate: 1, gravity: 0.1, spread: 0.1 },
  dripping_honey: { lifetime: 2, spawnRate: 1, gravity: 0.1, spread: 0.1 },
  dripping_lava: { lifetime: 2, spawnRate: 1, gravity: 0.1, spread: 0.1 },
  dripping_obsidian_tear: { lifetime: 2, spawnRate: 1, gravity: 0.1, spread: 0.1 },
  dripping_water: { lifetime: 2, spawnRate: 1, gravity: 0.1, spread: 0.1 },
  dust: { lifetime: 1, spawnRate: 10, spread: 0.2, color: '#ff0000', size: 1, supportsColor: true },
  dust_color_transition: { lifetime: 1, spawnRate: 10, spread: 0.2, color: '#ff0000', transitionColor: '#0000ff', size: 1, supportsColor: true, supportsTransitionColor: true },
  effect: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  elder_guardian: { lifetime: 1, spawnRate: 1, spread: 0 },
  electric_spark: { lifetime: 1, spawnRate: 5, spread: 0.5 },
  enchant: { lifetime: 1, spawnRate: 10, spread: 0.5, velocity: [0, 0.2, 0] },
  enchanted_hit: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  end_rod: { lifetime: 2, spawnRate: 5, spread: 0.2, velocity: [0, 0.1, 0] },
  entity_effect: { lifetime: 1, spawnRate: 5, spread: 0.2, color: '#ffffff', supportsColor: true },
  explosion: { lifetime: 1, spawnRate: 10, spread: 1 },
  explosion_emitter: { lifetime: 1, spawnRate: 1, spread: 2 },
  falling_dripstone_lava: { lifetime: 3, spawnRate: 1, gravity: 0.2, spread: 0.1 },
  falling_dripstone_water: { lifetime: 3, spawnRate: 1, gravity: 0.2, spread: 0.1 },
  falling_dust: { lifetime: 3, spawnRate: 1, gravity: 0.2, blockData: 'minecraft:stone', supportsBlockData: true },
  falling_honey: { lifetime: 3, spawnRate: 1, gravity: 0.2, spread: 0.1 },
  falling_lava: { lifetime: 3, spawnRate: 1, gravity: 0.2, spread: 0.1 },
  falling_nectar: { lifetime: 3, spawnRate: 1, gravity: 0.2, spread: 0.1 },
  falling_obsidian_tear: { lifetime: 3, spawnRate: 1, gravity: 0.2, spread: 0.1 },
  falling_spore_blossom: { lifetime: 5, spawnRate: 1, gravity: 0.02, spread: 0.5 },
  falling_water: { lifetime: 3, spawnRate: 1, gravity: 0.2, spread: 0.1 },
  firework: { lifetime: 1, spawnRate: 10, spread: 0.5, velocity: [0, 0.5, 0] },
  fishing: { lifetime: 1, spawnRate: 3, spread: 0.2 },
  flame: { lifetime: 1, spawnRate: 5, spread: 0.2 },
  flash: { lifetime: 0.5, spawnRate: 1, spread: 0 },
  glow: { lifetime: 2, spawnRate: 5, spread: 0.3 },
  glow_squid_ink: { lifetime: 2, spawnRate: 5, spread: 0.5 },
  happy_villager: { lifetime: 1, spawnRate: 1, spread: 0.2 },
  heart: { lifetime: 1, spawnRate: 1, spread: 0.2 },
  instant_effect: { lifetime: 0.5, spawnRate: 5, spread: 0.2 },
  item: { lifetime: 1, spawnRate: 5, spread: 0.3, itemData: 'minecraft:apple', supportsItemData: true },
  item_slime: { lifetime: 1, spawnRate: 5, spread: 0.3, itemData: 'minecraft:slime_ball', supportsItemData: true },
  item_snowball: { lifetime: 1, spawnRate: 5, spread: 0.3, itemData: 'minecraft:snowball', supportsItemData: true },
  landing_honey: { lifetime: 1, spawnRate: 1, spread: 0.1 },
  landing_lava: { lifetime: 1, spawnRate: 1, spread: 0.1 },
  landing_obsidian_tear: { lifetime: 1, spawnRate: 1, spread: 0.1 },
  large_smoke: { lifetime: 2, spawnRate: 3, spread: 0.5 },
  lava: { lifetime: 1, spawnRate: 5, spread: 0.2 },
  mycelium: { lifetime: 3, spawnRate: 5, spread: 0.5 },
  nautilus: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  note: { lifetime: 1, spawnRate: 1, spread: 0.2, color: '#ff0000', supportsColor: true },
  poof: { lifetime: 1, spawnRate: 10, spread: 0.5 },
  portal: { lifetime: 2, spawnRate: 10, spread: 0.5, velocity: [0, 0.1, 0] },
  rain: { lifetime: 2, spawnRate: 10, gravity: 0.2, spread: 0.5 },
  reverse_portal: { lifetime: 2, spawnRate: 10, spread: 0.5, velocity: [0, -0.1, 0] },
  sculk_charge: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  sculk_charge_pop: { lifetime: 0.5, spawnRate: 5, spread: 0.2 },
  sculk_soul: { lifetime: 2, spawnRate: 3, spread: 0.3 },
  shriek: { lifetime: 1, spawnRate: 1, spread: 0 },
  smoke: { lifetime: 2, spawnRate: 5, spread: 0.3 },
  sneeze: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  snowflake: { lifetime: 3, spawnRate: 5, gravity: 0.05, spread: 0.5 },
  sonic_boom: { lifetime: 1, spawnRate: 1, spread: 0 },
  soul: { lifetime: 2, spawnRate: 3, spread: 0.3 },
  soul_fire_flame: { lifetime: 1, spawnRate: 5, spread: 0.2 },
  spit: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  splash: { lifetime: 1, spawnRate: 10, spread: 0.5 },
  spore_blossom_air: { lifetime: 5, spawnRate: 5, gravity: 0.01, spread: 1 },
  squid_ink: { lifetime: 2, spawnRate: 5, spread: 0.5 },
  sweep_attack: { lifetime: 1, spawnRate: 1, spread: 0 },
  totem_of_undying: { lifetime: 1, spawnRate: 10, spread: 0.5 },
  trial_omen: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  trial_spawner_detection: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  underwater: { lifetime: 3, spawnRate: 10, spread: 1 },
  vault_connection: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  vibration: { lifetime: 1, spawnRate: 1, spread: 0 },
  warped_spore: { lifetime: 5, spawnRate: 5, gravity: 0.01, spread: 1 },
  wax_off: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  wax_on: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  white_ash: { lifetime: 3, spawnRate: 10, gravity: 0.05, spread: 1 },
  witch: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  gust: { lifetime: 2, spawnRate: 10, spread: 0.5, gravity: 0.05 },
  small_gust: { lifetime: 1.5, spawnRate: 8, spread: 0.3, gravity: 0.03 },
  infested: { lifetime: 1, spawnRate: 5, spread: 0.2 },
  ominous_spawning: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  raid_omen: { lifetime: 1, spawnRate: 5, spread: 0.3 },
  trial_spawner_detection_ominous: { lifetime: 1, spawnRate: 5, spread: 0.3 },
};