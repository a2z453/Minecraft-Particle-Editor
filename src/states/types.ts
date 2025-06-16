export interface Keyframe {
  id: string;
  time: number;
  position: { x: number; y: number; z: number };
  properties: Partial<ParticleProperties>;
}

export interface ParticleProperties {
  lifetime: number;
  velocity: { x: number; y: number; z: number };
  offset: { x: number; y: number; z: number };
  gravity: number;
  spawnRate: number;
  spread: number;
  direction: { x: number; y: number; z: number };
  color?: string;
  size: number;
  fade: [number, number];
  count: number;
  force: boolean;
  blockData?: string;
  itemData?: string;
  transitionColor?: string;
  customTexture?: string;
}

export interface Emitter {
  id: string;
  type: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
  properties: ParticleProperties;
  keyframes: Keyframe[];
}

export const PARTICLE_DATA: {
  [key: string]: Partial<ParticleProperties> & {
    supportsColor?: boolean;
    supportsTransitionColor?: boolean;
    supportsBlockData?: boolean;
    supportsItemData?: boolean;
  };
} = {
  ambient_entity_effect: { lifetime: 2, spawnRate: 5, spread: 0.5, size: 0.3, supportsColor: true },
  angry_villager: { lifetime: 2, spawnRate: 1, spread: 0.2, size: 0.4 },
  ash: { lifetime: 2, spawnRate: 10, gravity: 0.05, spread: 1, size: 0.2 },
  barrier: { lifetime: 2, spawnRate: 1, spread: 0.1, size: 0.5 },
  block: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3, supportsBlockData: true },
  block_marker: { lifetime: 2, spawnRate: 1, spread: 0.1, size: 0.5, supportsBlockData: true },
  bubble: { lifetime: 2, spawnRate: 5, spread: 0.2, size: 0.2 },
  bubble_column_up: { lifetime: 2, spawnRate: 10, spread: 0.3, size: 0.2 },
  bubble_pop: { lifetime: 2, spawnRate: 5, spread: 0.2, size: 0.2 },
  campfire_cosy_smoke: { lifetime: 5, spawnRate: 3, gravity: 0.01, spread: 0.5, size: 0.5 },
  campfire_signal_smoke: { lifetime: 5, spawnRate: 3, gravity: 0.01, spread: 0.5, size: 0.5 },
  cherry_leaves: { lifetime: 2, spawnRate: 5, gravity: 0.02, spread: 0.5, size: 0.3 },
  cloud: { lifetime: 2, spawnRate: 3, spread: 0.5, size: 0.5 },
  composter: { lifetime: 2, spawnRate: 5, spread: 0.2, size: 0.2 },
  crimson_spore: { lifetime: 2, spawnRate: 10, spread: 1, size: 0.2 },
  crit: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  current_down: { lifetime: 2, spawnRate: 5, spread: 0.2, size: 0.2 },
  damage_indicator: { lifetime: 2, spawnRate: 3, spread: 0.3, size: 0.4 },
  dolphin: { lifetime: 2, spawnRate: 5, spread: 0.2, size: 0.2 },
  dragon_breath: { lifetime: 2, spawnRate: 5, spread: 0.5, size: 0.3 },
  dripping_dripstone_lava: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  dripping_dripstone_water: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  dripping_honey: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  dripping_lava: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  dripping_obsidian_tear: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  dripping_water: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  dust: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.2, supportsColor: true },
  dust_color_transition: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.2, supportsColor: true, supportsTransitionColor: true },
  effect: { lifetime: 2, spawnRate: 5, spread: 0.5, size: 0.3, supportsColor: true },
  elder_guardian: { lifetime: 2, spawnRate: 1, spread: 0.5, size: 0.5 },
  electric_spark: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.2 },
  enchant: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  enchanted_hit: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  end_rod: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.2 },
  entity_effect: { lifetime: 2, spawnRate: 5, spread: 0.5, size: 0.3, supportsColor: true },
  explosion: { lifetime: 2, spawnRate: 3, spread: 0.5, size: 0.5 },
  explosion_emitter: { lifetime: 2, spawnRate: 1, spread: 0.5, size: 0.5 },
  falling_dripstone_lava: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_dripstone_water: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_dust: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3, supportsBlockData: true },
  falling_honey: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_lava: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_nectar: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_obsidian_tear: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  falling_spore_blossom: { lifetime: 2, spawnRate: 5, spread: 0.5, size: 0.2 },
  falling_water: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  firework: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  fishing: { lifetime: 2, spawnRate: 5, spread: 0.2, size: 0.2 },
  flame: { lifetime: 2, spawnRate: 5, spread: 0.2, size: 0.2 },
  flash: { lifetime: 2, spawnRate: 1, spread: 0.1, size: 0.5 },
  glow: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.2 },
  glow_squid_ink: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  happy_villager: { lifetime: 2, spawnRate: 3, spread: 0.3, size: 0.3 },
  heart: { lifetime: 2, spawnRate: 3, spread: 0.3, size: 0.3 },
  instant_effect: { lifetime: 2, spawnRate: 5, spread: 0.5, size: 0.3, supportsColor: true },
  item: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3, supportsItemData: true },
  item_slime: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3, supportsItemData: true },
  item_snowball: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3, supportsItemData: true },
  landing_honey: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  landing_lava: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  landing_obsidian_tear: { lifetime: 2, spawnRate: 2, spread: 0.1, size: 0.2 },
  large_smoke: { lifetime: 2, spawnRate: 3, spread: 0.5, size: 0.5 },
  lava: { lifetime: 2, spawnRate: 5, spread: 0.2, size: 0.2 },
  mycelium: { lifetime: 2, spawnRate: 5, spread: 0.5, size: 0.2 },
  nautilus: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  note: { lifetime: 2, spawnRate: 3, spread: 0.3, size: 0.3 },
  poof: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  portal: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  rain: { lifetime: 2, spawnRate: 10, spread: 0.5, size: 0.2 },
  reverse_portal: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  sculk_charge: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  sculk_charge_pop: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  sculk_soul: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  shriek: { lifetime: 2, spawnRate: 3, spread: 0.3, size: 0.4 },
  smoke: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  sneeze: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  snowflake: { lifetime: 2, spawnRate: 5, spread: 0.5, size: 0.2 },
  sonic_boom: { lifetime: 2, spawnRate: 1, spread: 0.5, size: 0.5 },
  soul: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  soul_fire_flame: { lifetime: 2, spawnRate: 5, spread: 0.2, size: 0.2 },
  spit: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  splash: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  spore_blossom_air: { lifetime: 2, spawnRate: 10, spread: 0.5, size: 0.2 },
  squid_ink: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  sweep_attack: { lifetime: 2, spawnRate: 3, spread: 0.3, size: 0.4 },
  totem_of_undying: { lifetime: 2, spawnRate: 5, spread: 0.5, size: 0.3 },
  trial_omen: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  trial_spawner_detection: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  underwater: { lifetime: 2, spawnRate: 10, spread: 0.5, size: 0.2 },
  vault_connection: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  vibration: { lifetime: 2, spawnRate: 3, spread: 0.3, size: 0.3 },
  warped_spore: { lifetime: 2, spawnRate: 10, spread: 0.5, size: 0.2 },
  wax_off: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  wax_on: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  white_ash: { lifetime: 2, spawnRate: 10, spread: 0.5, size: 0.2 },
  witch: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  gust: { lifetime: 2, spawnRate: 10, spread: 0.5, size: 0.3, gravity: 0.05 },
  small_gust: { lifetime: 2, spawnRate: 8, spread: 0.3, size: 0.2, gravity: 0.03 },
  infested: { lifetime: 2, spawnRate: 5, spread: 0.2, size: 0.3 },
  ominous_spawning: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  raid_omen: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
  trial_spawner_detection_ominous: { lifetime: 2, spawnRate: 5, spread: 0.3, size: 0.3 },
};