// src/utils/shapeGenerators.ts
import { Emitter } from "../states/types";

export function createCircleShape(radius: number = 2): Partial<Emitter>[] {
  const emitters: Partial<Emitter>[] = [];
  const count = 20;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * 2 * Math.PI;
    emitters.push({
      type: "dust",
      position: [Math.cos(angle) * radius, 1, Math.sin(angle) * radius],
      properties: { lifetime: 2, spawnRate: 10, color: "#ff0000" },
    });
  }
  return emitters;
}

// Add sphere, spiral, etc., similarly