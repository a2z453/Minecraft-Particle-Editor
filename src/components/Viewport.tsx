// src/components/Viewport.tsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useScene } from '../states/SceneContext';

// Placeholder textures (replace with actual Minecraft textures)
const PARTICLE_TEXTURES: { [key: string]: string } = {
  ambient_entity_effect: '/textures/effect_0.png', // Uses effect sprite sheet
  angry_villager: '/textures/angry.png',
  ash: '/textures/generic_0.png', // Generic particle for ash
  barrier: '/textures/generic_0.png', // Placeholder (barrier is often invisible)
  block: '/textures/block.png',
  block_marker: '/textures/block.png',
  bubble: '/textures/bubble.png',
  bubble_column_up: '/textures/bubble.png',
  bubble_pop: '/textures/bubble_pop_0.png', // Sprite sheet
  campfire_cosy_smoke: '/textures/big_smoke_0.png', // Sprite sheet
  campfire_signal_smoke: '/textures/big_smoke_0.png', // Sprite sheet
  cherry_leaves: '/textures/cherry_0.png', // Sprite sheet
  cloud: '/textures/generic_0.png', // Generic for cloud
  composter: '/textures/generic_0.png', // Generic for composter
  crimson_spore: '/textures/generic_0.png', // Generic for spores
  crit: '/textures/critical_hit.png',
  current_down: '/textures/bubble.png',
  damage_indicator: '/textures/damage.png',
  dolphin: '/textures/bubble.png', // Uses bubble-like texture
  dragon_breath: '/textures/generic_0.png', // Generic for dragon breath
  dripping_dripstone_lava: '/textures/drip_hang.png', // Drip texture
  dripping_dripstone_water: '/textures/drip_hang.png', // Drip texture
  dripping_honey: '/textures/drip_hang.png', // Drip texture
  dripping_lava: '/textures/drip_hang.png', // Drip texture
  dripping_obsidian_tear: '/textures/drip_hang.png', // Drip texture
  dripping_water: '/textures/drip_hang.png', // Drip texture
  dust: '/textures/dust.png',
  dust_color_transition: '/textures/dust.png',
  effect: '/textures/effect_0.png', // Sprite sheet
  elder_guardian: '/textures/generic_0.png', // Placeholder
  electric_spark: '/textures/spark_0.png', // Sprite sheet
  enchant: '/textures/glint.png',
  enchanted_hit: '/textures/enchanted_hit.png',
  end_rod: '/textures/generic_0.png', // Generic for end rod
  entity_effect: '/textures/effect_0.png', // Sprite sheet
  explosion: '/textures/explosion_0.png', // Sprite sheet
  explosion_emitter: '/textures/explosion_0.png', // Sprite sheet
  falling_dripstone_lava: '/textures/drip_fall.png', // Drip texture
  falling_dripstone_water: '/textures/drip_fall.png', // Drip texture
  falling_dust: '/textures/block.png',
  falling_honey: '/textures/drip_fall.png', // Drip texture
  falling_lava: '/textures/drip_fall.png', // Drip texture
  falling_nectar: '/textures/drip_fall.png', // Drip texture
  falling_obsidian_tear: '/textures/drip_fall.png', // Drip texture
  falling_spore_blossom: '/textures/generic_0.png', // Generic for spores
  falling_water: '/textures/drip_fall.png', // Drip texture
  firework: '/textures/spark_0.png', // Sprite sheet
  fishing: '/textures/bubble.png',
  flame: '/textures/flame.png',
  flash: '/textures/flash.png',
  glow: '/textures/glow.png',
  glow_squid_ink: '/textures/generic_0.png', // Generic for ink
  happy_villager: '/textures/glitter_0.png', // Sprite sheet
  heart: '/textures/heart.png',
  instant_effect: '/textures/effect_0.png', // Sprite sheet
  item: '/textures/generic_0.png', // Dynamic based on itemData
  item_slime: '/textures/generic_0.png', // Dynamic based on itemData
  item_snowball: '/textures/generic_0.png', // Dynamic based on itemData
  landing_honey: '/textures/drip_land.png', // Drip texture
  landing_lava: '/textures/drip_land.png', // Drip texture
  landing_obsidian_tear: '/textures/drip_land.png', // Drip texture
  large_smoke: '/textures/big_smoke_0.png', // Sprite sheet
  lava: '/textures/lava.png',
  mycelium: '/textures/generic_0.png', // Generic for mycelium
  nautilus: '/textures/nautilus.png',
  note: '/textures/note.png',
  poof: '/textures/generic_0.png', // Generic for poof
  portal: '/textures/generic_0.png', // Generic for portal
  rain: '/textures/drip_fall.png', // Drip-like texture
  reverse_portal: '/textures/generic_0.png', // Generic for portal
  sculk_charge: '/textures/sculk_charge_0.png', // Sprite sheet
  sculk_charge_pop: '/textures/sculk_charge_pop_0.png', // Sprite sheet
  sculk_soul: '/textures/sculk_soul_0.png', // Sprite sheet
  shriek: '/textures/shriek.png',
  smoke: '/textures/big_smoke_0.png', // Sprite sheet
  sneeze: '/textures/generic_0.png', // Generic for sneeze
  snowflake: '/textures/generic_0.png', // Generic for snowflake
  sonic_boom: '/textures/sonic_boom_0.png', // Sprite sheet
  soul: '/textures/soul_0.png', // Sprite sheet
  soul_fire_flame: '/textures/soul_fire_flame.png',
  spit: '/textures/generic_0.png', // Generic for spit
  splash: '/textures/splash_0.png', // Sprite sheet
  spore_blossom_air: '/textures/generic_0.png', // Generic for spores
  squid_ink: '/textures/generic_0.png', // Generic for ink
  sweep_attack: '/textures/sweep_0.png', // Sprite sheet
  totem_of_undying: '/textures/effect_0.png', // Sprite sheet
  trial_omen: '/textures/trial_omen.png',
  trial_spawner_detection: '/textures/trial_spawner_detection_0.png', // Sprite sheet
  underwater: '/textures/drip_fall.png', // Drip-like texture
  vault_connection: '/textures/vault_connection.png',
  vibration: '/textures/vibration.png',
  warped_spore: '/textures/generic_0.png', // Generic for spores
  wax_off: '/textures/generic_0.png', // Generic for wax
  wax_on: '/textures/generic_0.png', // Generic for wax
  white_ash: '/textures/generic_0.png', // Generic for ash
  witch: '/textures/spell_0.png', // Sprite sheet
};

const PARTICLE_DATA: { [key: string]: Partial<Emitter['properties']> & { supportsColor?: boolean; supportsTransitionColor?: boolean; supportsBlockData?: boolean; supportsItemData?: boolean } } = {
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
};

export default function Viewport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { emitters } = useScene();

  useEffect(() => {
    if (!canvasRef.current) return;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    const width = window.innerWidth - 64;
    const height = window.innerHeight - 44 - 128;
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(5, 5, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.GridHelper(50, 50));
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const particleSystems: { [key: string]: THREE.Points } = {};
    const textureLoader = new THREE.TextureLoader();

    const updateParticles = () => {
      emitters.forEach((emitter) => {
        if (!particleSystems[emitter.id]) {
          const geometry = new THREE.BufferGeometry();
          const positions: number[] = [];
          const colors: number[] = [];
          const sizes: number[] = [];

          const color = PARTICLE_DATA[emitter.type].supportsColor && emitter.properties.color
            ? new THREE.Color(emitter.properties.color)
            : new THREE.Color(1, 1, 1);
          for (let i = 0; i < emitter.properties.count; i++) {
            positions.push(
              emitter.position[0] + (Math.random() - 0.5) * emitter.properties.spread,
              emitter.position[1] + (Math.random() - 0.5) * emitter.properties.spread,
              emitter.position[2] + (Math.random() - 0.5) * emitter.properties.spread
            );
            colors.push(color.r, color.g, color.b);
            sizes.push(emitter.properties.size);
          }

          geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
          geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

          const material = new THREE.PointsMaterial({
            vertexColors: true,
            size: emitter.properties.size,
            transparent: true,
            map: textureLoader.load(PARTICLE_TEXTURES[emitter.type] || '/textures/default.png'),
          });

          particleSystems[emitter.id] = new THREE.Points(geometry, material);
          scene.add(particleSystems[emitter.id]);
        }

        const positions = particleSystems[emitter.id].geometry.attributes.position.array as number[];
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += emitter.properties.velocity[0] * 0.016;
          positions[i + 1] += emitter.properties.velocity[1] * 0.016 - emitter.properties.gravity * 0.016;
          positions[i + 2] += emitter.properties.velocity[2] * 0.016;
        }
        particleSystems[emitter.id].geometry.attributes.position.needsUpdate = true;
      });
    };

    const animate = () => {
      updateParticles();
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [emitters]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}