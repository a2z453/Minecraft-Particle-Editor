// src/components/exporters/CommandExport.ts
import { Emitter } from "../../states/types";

export function generateCommands(emitters: Emitter[]): string[] {
  return emitters.map((e) => {
    const [r, g, b] = new THREE.Color(e.properties.color).toArray();
    return `/particle ${e.type} ${e.position.join(" ")} ${e.properties.offset.join(" ")} ${e.properties.spread} ${e.properties.count} ${e.properties.force ? "force" : "normal"} @a ${r} ${g} ${b}`;
  });
}