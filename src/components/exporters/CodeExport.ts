// src/components/exporters/CodeExport.ts
import { Emitter } from '../../states/types';
import * as THREE from 'three';

export function generateSpigotCode(emitters: Emitter[]): string {
  let code = `import org.bukkit.Color;\nimport org.bukkit.Particle;\nimport org.bukkit.util.Vector;\nimport org.bukkit.Location;\nimport org.bukkit.Material;\n\npublic class ParticleEffect {\n  public void spawnParticles(World world, Location loc) {\n`;
  emitters.forEach((e) => {
    const [r, g, b] = e.properties.color
      ? new THREE.Color(e.properties.color).toArray().map((c) => Math.floor(c * 255))
      : [255, 255, 255];
    const data = e.properties.blockData
      ? `Material.${e.properties.blockData.split(':')[1].toUpperCase()}.createBlockData()`
      : e.properties.itemData
      ? `Material.${e.properties.itemData.split(':')[1].toUpperCase()}.createBlockData()`
      : e.type === 'dust'
      ? `new Particle.DustOptions(Color.fromRGB(${r}, ${g}, ${b}), ${e.properties.size})`
      : e.type === 'dust_color_transition'
      ? `new Particle.DustTransition(Color.fromRGB(${r}, ${g}, ${b}), Color.fromRGB(${e.properties.transitionColor ? new THREE.Color(e.properties.transitionColor).toArray().map((c) => Math.floor(c * 255)).join(', ') : '255, 255, 255'}), ${e.properties.size})`
      : e.type === 'entity_effect'
      ? `new Particle.DustOptions(Color.fromRGB(${r}, ${g}, ${b}), 1.0f)`
      : 'null';
    code += `    world.spawnParticle(\n      Particle.${e.type.toUpperCase()},\n      loc.clone().add(${e.position.join(', ')}),\n      ${e.properties.count},\n      ${e.properties.offset.join(', ')},\n      ${e.properties.spread},\n      ${data}\n    );\n`;
  });
  code += `  }\n}`;
  return code;
}