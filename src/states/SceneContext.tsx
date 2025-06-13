import React, { createContext, useContext, useState } from 'react';
import { Emitter, Keyframe } from './types';
import { v4 as uuid } from 'uuid';

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

export const SceneProvider: React.FC = ({ children }) => {
  const [emitters, setEmitters] = useState<Emitter[]>([]);
  const [timeline, setTimeline] = useState<Keyframe[]>([]);
  const [selectedEmitterId, setSelectedEmitterId] = useState<string>();

  const addEmitter = (e: Partial<Emitter>) => {
    const newEmitter: Emitter = {
      id: uuid(),
      type: e.type || 'flame',
      color: e.color || '#ffffff',
      position: e.position || [0, 0, 0],
      properties: e.properties || { lifetime: 2, velocity: 0, spawnRate: 10 }
    };
    setEmitters(prev => [...prev, newEmitter]);
    setSelectedEmitterId(newEmitter.id);
  };

  const updateEmitter = (id: string, changes: Partial<Emitter>) => {
    setEmitters(prev => prev.map(em => em.id === id ? { ...em, ...changes } : em));
  };

  const selectEmitter = (id: string) => {
    setSelectedEmitterId(id);
  };

  const addKeyframe = (kf: Partial<Keyframe>) => {
    const newKF: Keyframe = { id: uuid(), emitterId: kf.emitterId!, time: kf.time || 0, properties: kf.properties || {} };
    setTimeline(prev => [...prev, newKF]);
  };

  const removeKeyframe = (id: string) => {
    setTimeline(prev => prev.filter(kf => kf.id !== id));
  };

  const selectedEmitter = emitters.find(em => em.id === selectedEmitterId);

  return (
    <SceneContext.Provider value={{ emitters, timeline, selectedEmitter, addEmitter, updateEmitter, selectEmitter, addKeyframe, removeKeyframe }}>
      {children}
    </SceneContext.Provider>
  );
};

export const useScene = () => {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error('useScene must be inside SceneProvider');
  return ctx;
};