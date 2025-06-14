import React from 'react';
import { Keyframe } from '../states/types';
import { useScene } from '../states/SceneContext';

interface Props {
  emitterId: string;
  keyframes: Keyframe[];
}

export default function KeyframeEditor({ emitterId, keyframes }: Props) {
  const { addKeyframe, removeKeyframe, selectKeyframe, selectedKeyframeId } = useScene();

  return (
    <div className="space-y-1">
      <button
        onClick={() => addKeyframe(emitterId, { time: 0 })}
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        + Add Keyframe
      </button>
      {keyframes.map((kf) => (
        <div
          key={kf.id}
          className={`flex justify-between items-center p-1 rounded shadow cursor-pointer ${
            selectedKeyframeId === kf.id ? 'bg-blue-100' : 'bg-white'
          }`}
          onClick={() => selectKeyframe(kf.id)}
        >
          <span>Time: {kf.time}s</span>
          <button onClick={() => removeKeyframe(emitterId, kf.id)} className="text-red-500">✕</button>
        </div>
      ))}
    </div>
  );
}