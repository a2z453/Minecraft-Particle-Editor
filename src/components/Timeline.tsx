// src/components/Timeline.tsx
import React, { useState } from 'react';
import { useScene } from '../states/SceneContext';
import KeyframeEditor from '../utils/KeyframeEditor';

export default function Timeline() {
  const { timeline, addKeyframe, removeKeyframe, emitters } = useScene();
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div className="h-full p-2">
      <h2 className="font-semibold">Animation Timeline</h2>
      <input
        type="range"
        min={0}
        max={10}
        step={0.1}
        value={currentTime}
        onChange={(e) => setCurrentTime(+e.target.value)}
        className="w-full"
      />
      <p>Time: {currentTime}s</p>
      {emitters.map((emitter) => (
        <div key={emitter.id}>
          <h3>{emitter.type} (ID: {emitter.id})</h3>
          <KeyframeEditor
            keyframes={timeline.filter((kf) => kf.emitterId === emitter.id)}
            onAdd={(kf) => addKeyframe({ ...kf, emitterId: emitter.id })}
            onRemove={removeKeyframe}
          />
        </div>
      ))}
    </div>
  );
}