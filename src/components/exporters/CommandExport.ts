import { Emitter } from '../../states/types';

export function generateCommands(emitters: Emitter[]): string[] {
  return emitters.map(e => {
    const args = `${e.type} ${e.position.join(' ')} ${e.properties.spawnRate} 0 0 0 0`;
    return `/particle ${args}`;
  });
}