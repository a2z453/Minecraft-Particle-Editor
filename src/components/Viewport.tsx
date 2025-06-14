import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { useScene } from '../states/SceneContext';
import { PARTICLE_DATA } from '../states/types';

const FALLBACK_TEXTURE_PATH = '/textures/generic_0.png';

const PARTICLE_TEXTURES: { [key: string]: string } = {
  ambient_entity_effect: '/textures/effect_0.png',
  angry_villager: '/textures/angry.png',
  ash: '/textures/generic_0.png',
  barrier: '/textures/generic_0.png',
  block: '/textures/block.png',
  block_marker: '/textures/block.png',
  bubble: '/textures/bubble.png',
  bubble_column_up: '/textures/bubble.png',
  bubble_pop: '/textures/bubble_pop_0.png',
  campfire_cosy_smoke: '/textures/big_smoke_0.png',
  campfire_signal_smoke: '/textures/big_smoke_0.png',
  cherry_leaves: '/textures/cherry_0.png',
  cloud: '/textures/generic_0.png',
  composter: '/textures/generic_0.png',
  crimson_spore: '/textures/generic_0.png',
  crit: '/textures/critical_hit.png',
  current_down: '/textures/bubble.png',
  damage_indicator: '/textures/damage.png',
  dolphin: '/textures/bubble.png',
  dragon_breath: '/textures/generic_0.png',
  dripping_dripstone_lava: '/textures/drip_hang.png',
  dripping_dripstone_water: '/textures/drip_hang.png',
  dripping_honey: '/textures/drip_hang.png',
  dripping_lava: '/textures/drip_hang.png',
  dripping_obsidian_tear: '/textures/drip_hang.png',
  dripping_water: '/textures/drip_hang.png',
  dust: '/textures/dust.png',
  dust_color_transition: '/textures/dust.png',
  effect: '/textures/effect_0.png',
  elder_guardian: '/textures/generic_0.png',
  electric_spark: '/textures/spark_0.png',
  enchant: '/textures/sga_a.png',
  enchanted_hit: '/textures/enchanted_hit.png',
  end_rod: '/textures/generic_0.png',
  entity_effect: '/textures/effect_0.png',
  explosion: '/textures/explosion_0.png',
  explosion_emitter: '/textures/explosion_0.png',
  falling_dripstone_lava: '/textures/drip_fall.png',
  falling_dripstone_water: '/textures/drip_fall.png',
  falling_dust: '/textures/block.png',
  falling_honey: '/textures/drip_fall.png',
  falling_lava: '/textures/drip_fall.png',
  falling_nectar: '/textures/drip_fall.png',
  falling_obsidian_tear: '/textures/drip_fall.png',
  falling_spore_blossom: '/textures/generic_0.png',
  falling_water: '/textures/drip_fall.png',
  firework: '/textures/spark_0.png',
  fishing: '/textures/bubble.png',
  flame: '/textures/flame.png',
  flash: '/textures/flash.png',
  glow: '/textures/glow.png',
  glow_squid_ink: '/textures/generic_0.png',
  happy_villager: '/textures/glitter_0.png',
  heart: '/textures/heart.png',
  instant_effect: '/textures/effect_0.png',
  item: '/textures/generic_0.png',
  item_slime: '/textures/generic_0.png',
  item_snowball: '/textures/generic_0.png',
  landing_honey: '/textures/drip_land.png',
  landing_lava: '/textures/drip_land.png',
  landing_obsidian_tear: '/textures/drip_land.png',
  large_smoke: '/textures/big_smoke_0.png',
  lava: '/textures/lava.png',
  mycelium: '/textures/generic_0.png',
  nautilus: '/textures/nautilus.png',
  note: '/textures/note.png',
  poof: '/textures/generic_0.png',
  portal: '/textures/generic_0.png',
  rain: '/textures/drip_fall.png',
  reverse_portal: '/textures/generic_0.png',
  sculk_charge: '/textures/sculk_charge_0.png',
  sculk_charge_pop: '/textures/sculk_charge_pop_0.png',
  sculk_soul: '/textures/sculk_soul_0.png',
  shriek: '/textures/shriek.png',
  smoke: '/textures/big_smoke_0.png',
  sneeze: '/textures/generic_0.png',
  snowflake: '/textures/generic_0.png',
  sonic_boom: '/textures/sonic_boom_0.png',
  soul: '/textures/soul_0.png',
  soul_fire_flame: '/textures/soul_fire_flame.png',
  spit: '/textures/generic_0.png',
  splash: '/textures/splash_0.png',
  spore_blossom_air: '/textures/generic_0.png',
  squid_ink: '/textures/generic_0.png',
  sweep_attack: '/textures/sweep_0.png',
  totem_of_undying: '/textures/effect_0.png',
  trial_omen: '/textures/trial_omen.png',
  trial_spawner_detection: '/textures/trial_spawner_detection_0.png',
  underwater: '/textures/drip_fall.png',
  vault_connection: '/textures/vault_connection.png',
  vibration: '/textures/vibration.png',
  warped_spore: '/textures/generic_0.png',
  wax_off: '/textures/generic_0.png',
  wax_on: '/textures/generic_0.png',
  white_ash: '/textures/generic_0.png',
  witch: '/textures/spell_0.png',
  gust: '/textures/gust_0.png',
  small_gust: '/textures/small_gust_0.png',
  infested: '/textures/infested.png',
  ominous_spawning: '/textures/ominous_spawning.png',
  raid_omen: '/textures/raid_omen.png',
  trial_spawner_detection_ominous: '/textures/trial_spawner_detection_ominous_0.png',
};

const SPRITE_SHEETS: { [key: string]: { count: number; duration: number } } = {
  big_smoke: { count: 12, duration: 0.6 },
  bubble_pop: { count: 5, duration: 0.25 },
  cherry: { count: 12, duration: 0.6 },
  effect: { count: 8, duration: 0.4 },
  explosion: { count: 16, duration: 0.8 },
  glitter: { count: 8, duration: 0.4 },
  sculk_charge: { count: 7, duration: 0.35 },
  sculk_charge_pop: { count: 4, duration: 0.2 },
  sculk_soul: { count: 11, duration: 0.55 },
  sonic_boom: { count: 16, duration: 0.8 },
  soul: { count: 11, duration: 0.55 },
  spark: { count: 8, duration: 0.4 },
  spell: { count: 8, duration: 0.4 },
  splash: { count: 4, duration: 0.2 },
  sweep: { count: 8, duration: 0.4 },
  trial_spawner_detection: { count: 5, duration: 0.25 },
  trial_spawner_detection_ominous: { count: 5, duration: 0.25 },
  gust: { count: 12, duration: 0.6 },
  small_gust: { count: 7, duration: 0.35 },
};

export default function Viewport() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { emitters, selectedEmitter, updateEmitter } = useScene();
  const transformControlsRef = useRef<TransformControls | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    const width = window.innerWidth - 64;
    const height = window.innerHeight - 44 - 128;
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.5, 1000);
    camera.position.set(5, 5, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const grid = new THREE.GridHelper(50, 50, 0x888888, 0x888888);
    grid.position.y = 0.01;
    (grid.material as THREE.LineBasicMaterial).linewidth = 2;
    (grid.material as THREE.LineBasicMaterial).depthTest = true;
    (grid.material as THREE.LineBasicMaterial).depthWrite = false;
    scene.add(grid);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const particleSystems: { [key: string]: THREE.Points } = {};
    const textureLoader = new THREE.TextureLoader();
    const spriteSheetTimers: { [key: string]: number } = {};

    const transformControls = new TransformControls(camera, renderer.domElement);
    transformControlsRef.current = transformControls;
    transformControls.addEventListener('change', () => {
      if (selectedEmitter && transformControls.object) {
        const pos = transformControls.object.position.toArray() as [number, number, number];
        const rot = transformControls.object.rotation.toArray().slice(0, 3) as [number, number, number];
        const scale = transformControls.object.scale.toArray() as [number, number, number];
        updateEmitter(selectedEmitter.id, { position: pos, rotation: rot, scale });
      }
    });
    scene.add(transformControls);

    const updateParticles = (delta: number) => {
      emitters.forEach((emitter) => {
        if (!particleSystems[emitter.id]) {
          const geometry = new THREE.BufferGeometry();
          const positions: number[] = [];
          const colors: number[] = [];
          const sizes: number[] = [];
          const uvs: number[] = [];

          const color = PARTICLE_DATA[emitter.type]?.supportsColor && emitter.properties.color
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
            uvs.push(0, 0);
          }

          geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
          geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
          geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

          const texturePath = emitter.properties.customTexture
            ? emitter.properties.customTexture
            : (emitter.type === 'item' || emitter.type === 'item_slime' || emitter.type === 'item_snowball') && emitter.properties.itemData
            ? `/textures/items/${emitter.properties.itemData.split(':')[1]}.png`
            : PARTICLE_TEXTURES[emitter.type] || FALLBACK_TEXTURE_PATH;
          const texture = textureLoader.load(texturePath);

          const material = new THREE.PointsMaterial({
            vertexColors: true,
            size: emitter.properties.size,
            transparent: true,
            map: texture,
            alphaTest: 0.5,
          });

          const spriteKey = Object.keys(SPRITE_SHEETS).find((key) =>
            texturePath.includes(key)
          );
          if (spriteKey && SPRITE_SHEETS[spriteKey]) {
            material.map.repeat.set(1 / SPRITE_SHEETS[spriteKey].count, 1);
            spriteSheetTimers[emitter.id] = 0;
          }

          particleSystems[emitter.id] = new THREE.Points(geometry, material);
          scene.add(particleSystems[emitter.id]);
        }

        const positions = particleSystems[emitter.id].geometry.attributes.position.array as number[];
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += emitter.properties.velocity[0] * delta;
          positions[i + 1] += (emitter.properties.velocity[1] - emitter.properties.gravity) * delta;
          positions[i + 2] += emitter.properties.velocity[2] * delta;
        }
        particleSystems[emitter.id].geometry.attributes.position.needsUpdate = true;

        const spriteKey = Object.keys(SPRITE_SHEETS).find((key) =>
          PARTICLE_TEXTURES[emitter.type]?.includes(key)
        );
        if (spriteKey && SPRITE_SHEETS[spriteKey]) {
          spriteSheetTimers[emitter.id] = (spriteSheetTimers[emitter.id] || 0) + delta;
          const frameTime = SPRITE_SHEETS[spriteKey].duration / SPRITE_SHEETS[spriteKey].count;
          const frame = Math.floor(spriteSheetTimers[emitter.id] / frameTime) % SPRITE_SHEETS[spriteKey].count;
          const material = particleSystems[emitter.id].material as THREE.PointsMaterial;
          material.map.offset.set(frame / SPRITE_SHEETS[spriteKey].count, 0);
          material.map.needsUpdate = true;
        }
      });

      Object.keys(particleSystems).forEach((id) => {
        if (!emitters.find((e) => e.id === id)) {
          scene.remove(particleSystems[id]);
          particleSystems[id].geometry.dispose();
          (particleSystems[id].material as THREE.PointsMaterial).dispose();
          delete particleSystems[id];
          delete spriteSheetTimers[id];
        }
      });
    };

    const helper = new THREE.Object3D();
    if (selectedEmitter) {
      helper.position.set(...selectedEmitter.position);
      helper.rotation.set(...selectedEmitter.rotation.map((deg) => THREE.MathUtils.degToRad(deg)));
      helper.scale.set(...selectedEmitter.scale);
      transformControls.attach(helper);
    } else {
      transformControls.detach();
    }

    let mode: 'translate' | 'rotate' | 'scale' = 'translate';
    const setMode = (newMode: 'translate' | 'rotate' | 'scale') => {
      mode = newMode;
      transformControls.setMode(mode);
      transformControls.showX = true;
      transformControls.showY = true;
      transformControls.showZ = true;
    };
    setMode('translate');

    let lastTime = performance.now();
    const animate = () => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      updateParticles(delta);
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const newWidth = window.innerWidth - 64;
      const newHeight = window.innerHeight - 44 - 128;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'g':
          setMode('translate');
          break;
        case 'r':
          setMode('rotate');
          break;
        case 's':
          setMode('scale');
          break;
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
      Object.values(particleSystems).forEach((system) => {
        scene.remove(system);
        system.geometry.dispose();
        (system.material as THREE.PointsMaterial).dispose();
      });
      renderer.dispose();
    };
  }, [emitters, selectedEmitter]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded">
        <p>G: Move | R: Rotate | S: Scale</p>
      </div>
    </div>
  );
}