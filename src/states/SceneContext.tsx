// src/states/SceneContext.tsx (excerpt)
const addEmitter = (e: Partial<Emitter>) => {
  const newEmitter: Emitter = {
    id: uuid(),
    type: e.type || "flame",
    position: e.position || [0, 0, 0],
    properties: {
      lifetime: e.properties?.lifetime || 2,
      velocity: e.properties?.velocity || [0, 0, 0],
      offset: e.properties?.offset || [0, 0, 0],
      gravity: e.properties?.gravity || 0,
      spawnRate: e.properties?.spawnRate || 10,
      spread: e.properties?.spread || 0.1,
      direction: e.properties?.direction || [0, 1, 0],
      color: e.properties?.color || "#ffffff",
      size: e.properties?.size || 1,
      fade: e.properties?.fade || [0, 0],
      count: e.properties?.count || 1,
      force: e.properties?.force || false,
    },
  };
  setEmitters((prev) => [...prev, newEmitter]);
  setSelectedEmitterId(newEmitter.id);
};