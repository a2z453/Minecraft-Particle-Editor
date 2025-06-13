// src/components/exporters/CommandExport.ts
import { Emitter } from '../../states/types';
import * as THREE from 'three';

export function generateCommands(emitters: Emitter[]): string[] {
  return emitters.map((e) => {
    const [r, g, b] = e.properties.color
      ? new THREE.Color(e.properties.color).toArray()
      : [1, 1, 1];
    const transition = e.type === 'dust_color_transition' && e.properties.transitionColor
      ? `${new THREE.Color(e.properties.transitionColor).toArray().join(' ')}`
      : '';
    const data = e.properties.blockData || e.properties.itemData || '';
    return `/particle ${e.type} ${e.position.join(' ')} ${e.properties.offset.join(' ')} ${e.properties.spread} ${e.properties.count} ${e.properties.force ? 'force' : 'normal'} @a ${data} ${r} ${g} ${b} ${transition}`.trim();
  });
}