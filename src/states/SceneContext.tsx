// src/states/SceneContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Emitter, Keyframe } from './types';

interface SceneContextType {
  emitters: Emitter[];
  timeline: Keyframe[];
  selectedEmitter?: Emitter;
  addEmitter: (e: Partial<Emitter>) => void;
  updateEmitter: (id: string, changes: Partial<Emitter>) => void;
  selectEmitter: (id: string) => void;
  addKeyframe: (kf: Partial<Keyframe>) => void;
  removeKeyframe: (id: string) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export const SceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emitters, setEmitters] = useState<Emitter[]>([]);
  const [timeline, setTimeline] = useState<Keyframe[]>([]);
  const [selectedEmitterId, setSelectedEmitterId] = useState<string>();

  const addEmitter = (e: Partial<Emitter>) => {
    const newEmitter: Emitter = {
      id: uuid(),
      type: e.type || 'flame',
      position: e.position || [0, 0, 0],
      properties: {
        lifetime: e.properties?.lifetime || 2,
        velocity: e.properties?.velocity || [0, 0, 0],
        offset: e.properties?.offset || [0, 0, 0],
        gravity: e.properties?.gravity || 0,
        spawnRate: e.properties?.spawnRate || 10,
        spread: e.properties?.spread || 0.1,
        direction: e.properties?.direction || [0, 1, 0],
        color: e.properties?.color || '#ffffff',
        size: e.properties?.size || 1,
        fade: e.properties?.fade || [0, 0],
        count: e.properties?.count || 1,
        force: e.properties?.force || false,
        blockData: e.properties?.blockData || null,
        itemData: e.properties?.itemData || null,
        transitionColor: e.properties?.transitionColor || null,
      },
    };
    setEmitters((prev) => [...prev, newEmitter]);
    setSelectedEmitterId(newEmitter.id);
  };

  const updateEmitter = (id: string, changes: Partial<Emitter>) => {
    setEmitters((prev) => prev.map((em) => (em.id === id ? { ...em, ...changes } : em)));
  };

  const selectEmitter = (id: string) => {
    setSelectedEmitterId(id);
  };

  const addKeyframe = (kf: Partial<Keyframe>) => {
    const newKF: Keyframe = {
      id: uuid(),
      emitterId: kf.emitterId!,
      time: kf.time || 0,
      properties: kf.properties || {},
    };
    setTimeline((prev) => [...prev, newKF]);
  };

  const removeKeyframe = (id: string) => {
    setTimeline((prev) => prev.filter((kf) => kf.id !== id));
  };

  const selectedEmitter = emitters.find((em) => em.id === selectedEmitterId);

  return (
    <SceneContext.Provider
      value={{
        emitters,
        timeline,
        selectedEmitter,
        addEmitter,
        updateEmitter,
        selectEmitter,
        addKeyframe,
        removeKeyframe,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export const useScene = () => {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error('useScene must be inside SceneProvider');
  return ctx;
};