// src/states/SceneContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Emitter } from './types';

interface SceneContextType {
  emitters: Emitter[];
  selectedEmitter: Emitter | null;
  addEmitter: (emitter: Partial<Emitter>) => void;
  updateEmitter: (id: string, emitter: Partial<Emitter>) => void;
  removeEmitter: (id: string) => void;
  setSelectedEmitter: (id: string | null) => void;
  resetEmitterParticles: (id: string) => void;
  currentTime: number; // Animation time in seconds
  setCurrentTime: (time: number) => void;
}

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [emitters, setEmitters] = useState<Emitter[]>([]);
  const [selectedEmitterId, setSelectedEmitterId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const addEmitter = (emitter: Partial<Emitter>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setEmitters([...emitters, { id, type: 'flame', position: [0, 1, 0], properties: {}, keyframes: [], ...emitter }]);
  };

  const updateEmitter = (id: string, emitter: Partial<Emitter>) => {
    setEmitters(emitters.map((e) => (e.id === id ? { ...e, ...emitter } : e)));
  };

  const removeEmitter = (id: string) => {
    setEmitters(emitters.filter((e) => e.id !== id));
    if (selectedEmitterId === id) setSelectedEmitterId(null);
  };

  const setSelectedEmitter = (id: string | null) => {
    setSelectedEmitterId(id);
  };

  const resetEmitterParticles = (id: string) => {
    const emitter = emitters.find((e) => e.id === id);
    if (emitter) {
      updateEmitter(id, { ...emitter });
    }
  };

  const selectedEmitter = emitters.find((e) => e.id === selectedEmitterId) || null;

  // Animate emitters based on keyframes
  useEffect(() => {
    const animate = () => {
      emitters.forEach((emitter) => {
        if (emitter.keyframes.length > 0) {
          const kfBefore = emitter.keyframes.filter((kf) => kf.time <= currentTime).sort((a, b) => b.time - a.time)[0];
          const kfAfter = emitter.keyframes.filter((kf) => kf.time > currentTime).sort((a, b) => a.time - b.time)[0];
          if (kfBefore && !kfAfter) {
            updateEmitter(emitter.id, { position: kfBefore.position, properties: kfBefore.properties });
          } else if (kfBefore && kfAfter) {
            const t = (currentTime - kfBefore.time) / (kfAfter.time - kfBefore.time);
            const lerp = (a: number, b: number) => a + (b - a) * t;
            const newPosition: [number, number, number] = [
              lerp(kfBefore.position[0], kfAfter.position[0]),
              lerp(kfBefore.position[1], kfAfter.position[1]),
              lerp(kfBefore.position[2], kfAfter.position[2]),
            ];
            const newProperties = Object.keys(kfBefore.properties).reduce((acc, key) => {
              const a = kfBefore.properties[key as keyof ParticleProperties];
              const b = kfAfter.properties[key as keyof ParticleProperties];
              if (typeof a === 'number' && typeof b === 'number') {
                acc[key] = lerp(a, b);
              } else if (Array.isArray(a) && Array.isArray(b)) {
                acc[key] = a.map((v, i) => lerp(v, b[i]));
              } else {
                acc[key] = a;
              }
              return acc;
            }, {} as Partial<ParticleProperties>);
            updateEmitter(emitter.id, { position: newPosition, properties: newProperties });
          }
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [currentTime, emitters]);

  return (
    <SceneContext.Provider value={{ emitters, selectedEmitter, addEmitter, updateEmitter, removeEmitter, setSelectedEmitter, resetEmitterParticles, currentTime, setCurrentTime }}>
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) throw new Error('useScene must be used within a SceneProvider');
  return context;
}