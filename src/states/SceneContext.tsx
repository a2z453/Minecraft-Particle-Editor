import React, { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Emitter, Keyframe } from './types';

interface SceneContextType {
  emitters: Emitter[];
  selectedEmitter?: Emitter;
  selectedKeyframeId?: string;
  addEmitter: (e: Partial<Emitter>) => void;
  updateEmitter: (id: string, changes: Partial<Emitter>) => void;
  selectEmitter: (id: string) => void;
  addKeyframe: (emitterId: string, kf: Partial<Keyframe>) => void;
  updateKeyframe: (emitterId: string, kfId: string, changes: Partial<Keyframe>) => void;
  removeKeyframe: (emitterId: string, id: string) => void;
  selectKeyframe: (id: string) => void;
}

const SceneContext = createContext<SceneContextType | null>(null);

export const SceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emitters, setEmitters] = useState<Emitter[]>([]);
  const [selectedEmitterId, setSelectedEmitterId] = useState<string>();
  const [selectedKeyframeId, setSelectedKeyframeId] = useState<string>();

  const addEmitter = (e: Partial<Emitter>) => {
    const newEmitter: Emitter = {
      id: uuid(),
      type: e.type || 'flame',
      position: e.position || { x: 0, y: 0, z: 0 },
      rotation: e.rotation || { x: 0, y: 0, z: 0 },
      scale: e.scale || { x: 1, y: 1, z: 1 },
      properties: {
        lifetime: e.properties?.lifetime || 2,
        velocity: e.properties?.velocity || { x: 0, y: 0, z: 0 },
        offset: e.properties?.offset || { x: 0, y: 0, z: 0 },
        gravity: e.properties?.gravity || 0,
        spawnRate: e.properties?.spawnRate || 10,
        spread: e.properties?.spread || 0.1,
        direction: e.properties?.direction || { x: 0, y: 1, z: 0 },
        color: e.properties?.color || '#ffffff',
        size: e.properties?.size || 1,
        fade: e.properties?.fade || [0, 0],
        count: e.properties?.count || 1,
        force: e.properties?.force || false,
        blockData: e.properties?.blockData || null,
        itemData: e.properties?.itemData || null,
        transitionColor: e.properties?.transitionColor || null,
      },
      keyframes: [],
    };
    setEmitters((prev) => [...prev, newEmitter]);
    setSelectedEmitterId(newEmitter.id);
    setSelectedKeyframeId(undefined);
  };

  const updateEmitter = (id: string, changes: Partial<Emitter>) => {
    setEmitters((prev) => prev.map((em) => (em.id === id ? { ...em, ...changes } : em)));
  };

  const selectEmitter = (id: string) => {
    setSelectedEmitterId(id);
    setSelectedKeyframeId(undefined);
  };

  const addKeyframe = (emitterId: string, kf: Partial<Keyframe>) => {
    const newKF: Keyframe = {
      id: uuid(),
      time: kf.time || 0,
      position: kf.position || emitters.find((e) => e.id === emitterId)!.position,
      properties: kf.properties || { ...emitters.find((e) => e.id === emitterId)!.properties },
    };
    setEmitters((prev) =>
      prev.map((em) => (em.id === emitterId ? { ...em, keyframes: [...em.keyframes, newKF] } : em))
    );
  };

  const updateKeyframe = (emitterId: string, kfId: string, changes: Partial<Keyframe>) => {
    setEmitters((prev) =>
      prev.map((em) =>
        em.id === emitterId
          ? {
              ...em,
              keyframes: em.keyframes.map((kf) => (kf.id === kfId ? { ...kf, ...changes } : kf)),
            }
          : em
      )
    );
  };

  const removeKeyframe = (emitterId: string, id: string) => {
    setEmitters((prev) =>
      prev.map((em) =>
        em.id === emitterId
          ? { ...em, keyframes: em.keyframes.filter((kf) => kf.id !== id) }
          : em
      )
    );
    if (selectedKeyframeId === id) setSelectedKeyframeId(undefined);
  };

  const selectKeyframe = (id: string) => {
    setSelectedKeyframeId(id);
  };

  const selectedEmitter = emitters.find((em) => em.id === selectedEmitterId);

  return (
    <SceneContext.Provider
      value={{
        emitters,
        selectedEmitter,
        selectedKeyframeId,
        addEmitter,
        updateEmitter,
        selectEmitter,
        addKeyframe,
        updateKeyframe,
        removeKeyframe,
        selectKeyframe,
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