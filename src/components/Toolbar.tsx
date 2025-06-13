// src/components/Toolbar.tsx
import React from 'react';
import { useScene } from '../states/SceneContext';
import { createCircleShape, createSphereShape, createSpiralShape } from '../utils/shapeGenerators';
import { PARTICLE_DATA } from '../states/types';

const particleCategories = [
  {
    category: 'Ambient',
    particles: ['ambient_entity_effect', 'crimson_spore', 'mycelium', 'spore_blossom_air', 'warped_spore'],
  },
  {
    category: 'Block',
    particles: ['block', 'block_marker', 'falling_dust'],
  },
  {
    category: 'Drip',
    particles: [
      'dripping_dripstone_lava', 'dripping_dripstone_water', 'dripping_honey', 'dripping_lava',
      'dripping_obsidian_tear', 'dripping_water', 'falling_dripstone_lava', 'falling_dripstone_water',
      'falling_honey', 'falling_lava', 'falling_nectar', 'falling_obsidian_tear', 'landing_honey',
      'landing_lava', 'landing_obsidian_tear',
    ],
  },
  {
    category: 'Effect',
    particles: ['crit', 'damage_indicator', 'enchanted_hit', 'sweep_attack'],
  },
  {
    category: 'Environmental',
    particles: ['ash', 'cherry_leaves', 'cloud', 'rain', 'snowflake', 'white_ash'],
  },
  {
    category: 'Magic',
    particles: ['dragon_breath', 'enchant', 'nautilus', 'portal', 'reverse_portal', 'witch'],
  },
  {
    category: 'Mob',
    particles: ['angry_villager', 'dolphin', 'elder_guardian', 'happy_villager', 'heart'],
  },
  {
    category: 'Other',
    particles: [
      'barrier', 'bubble', 'bubble_column_up', 'bubble_pop', 'campfire_cosy_smoke', 'campfire_signal_smoke',
      'composter', 'current_down', 'dust', 'dust_color_transition', 'effect', 'electric_spark', 'end_rod',
      'entity_effect', 'explosion', 'explosion_emitter', 'falling_spore_blossom', 'firework', 'fishing',
      'flame', 'flash', 'glow', 'glow_squid_ink', 'instant_effect', 'item', 'item_slime', 'item_snowball',
      'large_smoke', 'lava', 'note', 'poof', 'sculk_charge', 'sculk_charge_pop', 'sculk_soul', 'shriek',
      'smoke', 'sneeze', 'sonic_boom', 'soul', 'soul_fire_flame', 'spit', 'splash', 'squid_ink',
      'totem_of_undying', 'trial_omen', 'trial_spawner_detection', 'underwater', 'vault_connection',
      'vibration', 'wax_off', 'wax_on', 'gust', 'small_gust', 'infested', 'ominous_spawning', 'raid_omen',
      'trial_spawner_detection_ominous',
    ],
  },
];

export default function Toolbar() {
  const { addEmitter } = useScene();

  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Add Emitter</h2>
      <select
        onChange={(e) => {
          const type = e.target.value;
          if (type) {
            addEmitter({ type, position: [0, 1, 0], properties: PARTICLE_DATA[type] });
          }
        }}
        className="w-full p-2 border rounded"
      >
        <option value="" disabled selected>
          Select Particle
        </option>
        {particleCategories.map((category) => (
          <optgroup key={category.category} label={category.category}>
            {category.particles.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <h2 className="font-semibold">Shape Presets</h2>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => addEmitter(createCircleShape())} className="p-2 bg-white rounded shadow">Circle</button>
        <button onClick={() => addEmitter(createSphereShape())} className="p-2 bg-white rounded shadow">Sphere</button>
        <button onClick={() => addEmitter(createSpiralShape())} className="p-2 bg-white rounded shadow">Spiral</button>
      </div>
    </div>
  );
}