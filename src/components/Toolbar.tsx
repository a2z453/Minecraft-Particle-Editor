// src/components/Toolbar.tsx
import React, { useState } from 'react';
import { useScene } from '../states/SceneContext';
import { createCircleShape, createSphereShape, createSpiralShape } from '../utils/shapeGenerators';
import { PARTICLE_DATA } from '../states/types';
import Exporter from './Exporter';

const particleCategories = [
  { category: 'Ambient', particles: ['ambient_entity_effect', 'crimson_spore', 'mycelium', 'spore_blossom_air', 'warped_spore'] },
  { category: 'Block', particles: ['block', 'block_marker', 'falling_dust'] },
  { category: 'Drip', particles: ['dripping_dripstone_lava', 'dripping_dripstone_water', 'dripping_honey', 'dripping_lava', 'dripping_obsidian_tear', 'dripping_water', 'falling_dripstone_lava', 'falling_dripstone_water', 'falling_honey', 'falling_lava', 'falling_nectar', 'falling_obsidian_tear', 'landing_honey', 'landing_lava', 'landing_obsidian_tear'] },
  { category: 'Effect', particles: ['crit', 'damage_indicator', 'enchanted_hit', 'sweep_attack'] },
  { category: 'Environmental', particles: ['ash', 'cherry_leaves', 'cloud', 'rain', 'snowflake', 'white_ash'] },
  { category: 'Magic', particles: ['dragon_breath', 'enchant', 'nautilus', 'portal', 'reverse_portal', 'witch'] },
  { category: 'Mob', particles: ['angry_villager', 'dolphin', 'elder_guardian', 'happy_villager', 'heart'] },
  { category: 'Other', particles: ['barrier', 'bubble', 'bubble_column_up', 'bubble_pop', 'campfire_cosy_smoke', 'campfire_signal_smoke', 'composter', 'current_down', 'dust', 'dust_color_transition', 'effect', 'electric_spark', 'end_rod', 'entity_effect', 'explosion', 'explosion_emitter', 'falling_spore_blossom', 'firework', 'fishing', 'flame', 'flash', 'glow', 'glow_squid_ink', 'instant_effect', 'item', 'item_slime', 'item_snowball', 'large_smoke', 'lava', 'note', 'poof', 'sculk_charge', 'sculk_charge_pop', 'sculk_soul', 'shriek', 'smoke', 'sneeze', 'sonic_boom', 'soul', 'soul_fire_flame', 'spit', 'splash', 'squid_ink', 'totem_of_undying', 'trial_omen', 'trial_spawner_detection', 'underwater', 'vault_connection', 'vibration', 'wax_off', 'wax_on', 'gust', 'small_gust', 'infested', 'ominous_spawning', 'raid_omen', 'trial_spawner_detection_ominous'] },
];

export default function Toolbar() {
  const { addEmitter, selectedEmitter, updateEmitter, resetEmitterParticles } = useScene();
  const [showExporter, setShowExporter] = useState(false);
  const [keyframeTime, setKeyframeTime] = useState(0);

  const addKeyframe = () => {
    if (selectedEmitter) {
      const newKeyframe = {
        time: keyframeTime,
        position: [...selectedEmitter.position],
        properties: { ...selectedEmitter.properties },
      };
      updateEmitter(selectedEmitter.id, {
        keyframes: [...selectedEmitter.keyframes, newKeyframe].sort((a, b) => a.time - b.time),
      });
    }
  };

  const deleteKeyframe = (time: number) => {
    if (selectedEmitter) {
      updateEmitter(selectedEmitter.id, {
        keyframes: selectedEmitter.keyframes.filter((kf) => kf.time !== time),
      });
    }
  };

  return (
    <div className="absolute top-4 left-4 bg-white bg-opacity-80 p-4 rounded shadow-lg z-10">
      <h2 className="font-semibold text-sm mb-2">Add Emitter</h2>
      <select
        onChange={(e) => {
          const type = e.target.value;
          if (type) {
            addEmitter({ type, position: [0, 1, 0], properties: PARTICLE_DATA[type], keyframes: [] });
          }
        }}
        className="w-40 p-1 text-sm border rounded mb-2"
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
      <h2 className="font-semibold text-sm mb-2">Shape Presets</h2>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button onClick={() => addEmitter(createCircleShape())} className="p-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Circle</button>
        <button onClick={() => addEmitter(createSphereShape())} className="p-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Sphere</button>
        <button onClick={() => addEmitter(createSpiralShape())} className="p-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Spiral</button>
        <button
          onClick={() => selectedEmitter && resetEmitterParticles(selectedEmitter.id)}
          disabled={!selectedEmitter}
          className="p-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Reset Particles
        </button>
      </div>
      <h2 className="font-semibold text-sm mb-2">Keyframes</h2>
      <div className="flex gap-2 mb-2">
        <input
          type="number"
          value={keyframeTime}
          onChange={(e) => setKeyframeTime(parseFloat(e.target.value) || 0)}
          className="w-20 p-1 text-sm border rounded"
          placeholder="Time (s)"
          step="0.1"
          min="0"
        />
        <button
          onClick={addKeyframe}
          disabled={!selectedEmitter}
          className="p-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Add Keyframe
        </button>
      </div>
      {selectedEmitter && selectedEmitter.keyframes.length > 0 && (
        <ul className="text-sm mb-2">
          {selectedEmitter.keyframes.map((kf) => (
            <li key={kf.time} className="flex justify-between items-center">
              <span>Time: {kf.time}s</span>
              <button
                onClick={() => deleteKeyframe(kf.time)}
                className="p-1 text-xs bg-red-100 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <h2 className="font-semibold text-sm mb-2">Export</h2>
      <button
        onClick={() => setShowExporter(true)}
        className="p-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
      >
        Open Exporter
      </button>
      {showExporter && <Exporter onClose={() => setShowExporter(false)} />}
    </div>
  );
}