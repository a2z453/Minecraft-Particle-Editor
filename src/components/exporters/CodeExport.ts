import { Emitter } from '../../states/types';
import * as THREE from 'three';

export function generateSpigotCode(emitters: Emitter[]): string {
  let code = `import org.bukkit.Color;
import org.bukkit.Particle;
import org.bukkit.util.Vector;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.scheduler.BukkitRunnable;

public class ParticleEffect extends BukkitRunnable {
  private final JavaPlugin plugin;
  private final Location baseLoc;
  private int tick = 0;
  private final int maxTicks;

  public ParticleEffect(JavaPlugin plugin, Location baseLoc) {
    this.plugin = plugin;
    this.baseLoc = baseLoc;
    this.maxTicks = ${Math.max(...emitters.flatMap((e) => e.keyframes.map((kf) => kf.time * 20)), 20)};
  }

  @Override
  public void run() {
    if (tick >= maxTicks) {
      this.cancel();
      return;
    }
`;

  emitters.forEach((emitter, index) => {
    code += `    // Emitter ${index + 1}: ${emitter.type}\n`;
    if (emitter.keyframes.length > 0) {
      code += `    if (tick == 0) {\n`;
      const initialProps = emitter.properties;
      const [r0, g0, b0] = initialProps.color ? new THREE.Color(initialProps.color).toArray().map((c) => Math.floor(c * 255)) : [255, 255, 255];
      const data0 = initialProps.blockData
        ? `Material.${initialProps.blockData.split(':')[1].toUpperCase()}.createBlockData()`
        : initialProps.itemData
        ? `Material.${initialProps.itemData.split(':')[1].toUpperCase()}.createBlockData()`
        : emitter.type === 'dust'
        ? `new Particle.DustOptions(Color.fromRGB(${r0}, ${g0}, ${b0}), ${initialProps.size})`
        : emitter.type === 'dust_color_transition'
        ? `new Particle.DustTransition(Color.fromRGB(${r0}, ${g0}, ${b0}), Color.fromRGB(${initialProps.transitionColor ? new THREE.Color(initialProps.transitionColor).toArray().map((c) => Math.floor(c * 255)).join(', ') : '255, 255, 255'}), ${initialProps.size})`
        : 'null';
      code += `      baseLoc.getWorld().spawnParticle(
        Particle.${emitter.type.toUpperCase()},
        baseLoc.clone().add(${emitter.position.join(', ')}),
        ${initialProps.count},
        ${initialProps.offset.join(', ')},
        ${initialProps.spread},
        ${data0}
      );\n    }\n`;

      emitter.keyframes.forEach((kf, kfIndex) => {
        const tickTime = Math.floor(kf.time * 20);
        code += `    if (tick >= ${tickTime}) {\n`;
        const [r, g, b] = kf.properties.color ? new THREE.Color(kf.properties.color).toArray().map((c) => Math.floor(c * 255)) : [r0, g0, b0];
        const data = kf.properties.blockData
          ? `Material.${kf.properties.blockData.split(':')[1].toUpperCase()}.createBlockData()`
          : kf.properties.itemData
          ? `Material.${kf.properties.itemData.split(':')[1].toUpperCase()}.createBlockData()`
          : emitter.type === 'dust'
          ? `new Particle.DustOptions(Color.fromRGB(${r}, ${g}, ${b}), ${kf.properties.size || initialProps.size})`
          : emitter.type === 'dust_color_transition'
          ? `new Particle.DustTransition(Color.fromRGB(${r}, ${g}, ${b}), Color.fromRGB(${kf.properties.transitionColor ? new THREE.Color(kf.properties.transitionColor).toArray().map((c) => Math.floor(c * 255)).join(', ') : `${r}, ${g}, ${b}`}), ${kf.properties.size || initialProps.size})`
          : 'null';
        code += `      baseLoc.getWorld().spawnParticle(
        Particle.${emitter.type.toUpperCase()},
        baseLoc.clone().add(${kf.position.join(', ')}),
        ${kf.properties.count || initialProps.count},
        ${kf.properties.offset?.join(', ') || initialProps.offset.join(', ')},
        ${kf.properties.spread || initialProps.spread},
        ${data}
      );\n    }\n`;
      });
    } else {
      const [r, g, b] = emitter.properties.color ? new THREE.Color(emitter.properties.color).toArray().map((c) => Math.floor(c * 255)) : [255, 255, 255];
      const data = emitter.properties.blockData
        ? `Material.${emitter.properties.blockData.split(':')[1].toUpperCase()}.createBlockData()`
        : emitter.properties.itemData
        ? `Material.${emitter.properties.itemData.split(':')[1].toUpperCase()}.createBlockData()`
        : emitter.type === 'dust'
        ? `new Particle.DustOptions(Color.fromRGB(${r}, ${g}, ${b}), ${emitter.properties.size})`
        : emitter.type === 'dust_color_transition'
        ? `new Particle.DustTransition(Color.fromRGB(${r}, ${g}, ${b}), Color.fromRGB(${emitter.properties.transitionColor ? new THREE.Color(emitter.properties.transitionColor).toArray().map((c) => Math.floor(c * 255)).join(', ') : '255, 255, 255'}), ${emitter.properties.size})`
        : 'null';
      code += `    baseLoc.getWorld().spawnParticle(
      Particle.${emitter.type.toUpperCase()},
      baseLoc.clone().add(${emitter.position.join(', ')}),
      ${emitter.properties.count},
      ${emitter.properties.offset.join(', ')},
      ${emitter.properties.spread},
      ${data}
    );\n`;
    }
  });

  code += `    tick++;
  }

  public void start() {
    this.runTaskTimer(plugin, 0L, 1L);
  }
}`;

  return code;
}