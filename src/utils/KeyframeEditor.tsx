import React from 'react';
import { Keyframe } from '../state/types';

interface Props {
  keyframes: Keyframe[];
  onAdd: (kf: Partial<Keyframe>) => void;
  onRemove: (id: string) => void;
}

export default function KeyframeEditor({ keyframes, onAdd, onRemove }: Props) {
  return (
    <div className="space-y-1">
      <button onClick={() => onAdd({ emitterId: keyframes[0]?.emitterId, time: Date.now() })} className="px-2 py-1 bg-blue-500 text-white rounded">
        + Add Keyframe
      </button>
      {keyframes.map(kf => (
        <div key={kf.id} className="flex justify-between items-center p-1 bg-white rounded shadow">
          <span>Emitter: {kf.emitterId} @ {kf.time}</span>
          <button onClick={() => onRemove(kf.id)} className="text-red-500">✕</button>
        </div>
      ))}
    </div>
  );
}