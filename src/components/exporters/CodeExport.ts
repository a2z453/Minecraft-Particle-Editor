import { Emitter } from '../../states/types';

export function generateSpigotCode(emitters: Emitter[]): string {
  let code = `public void spawnParticles() {\n`;
  emitters.forEach(e => {
    code += `  world.spawnParticle(Particle.${e.type.toUpperCase()}, ${e.position.join(', ')}, ${e.properties.spawnRate}, new DustOptions(Color.fromRGB(${e.color}), 1));\n`;
  });
  code += `}`;
  return code;
}