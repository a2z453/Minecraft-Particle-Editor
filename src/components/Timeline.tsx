import React, { useState } from 'react';
import { useScene } from '../states/SceneContext';
import KeyframeEditor from '../utils/KeyframeEditor';

export default function Timeline() {
  const { emitters } = useScene();
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 60;

  return (
    <div className="h-full p-2 overflow-y-auto">
      <h2 className="font-semibold">Animation Timeline</h2>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={(e) => setCurrentTime(+e.target.value)}
          className="w-full"
        />
        <span>{currentTime.toFixed(1)}s / {duration}s</span>
      </div>
      <div className="mt-2">
        {emitters.map((emitter) => (
          <div key={emitter.id} className="mb-4">
            <h3 className="font-medium">{emitter.type} (ID: {emitter.id.slice(0, 8)}...)</h3>
            <div className="relative h-12 bg-gray-100 rounded">
              {emitter.keyframes.map((kf) => (
                <div
                  key={kf.id}
                  className="absolute w-2 h-12 bg-blue-500"
                  style={{ left: `${(kf.time / duration) * 100}%` }}
                />
              ))}
            </div>
            <KeyframeEditor emitterId={emitter.id} keyframes={emitter.keyframes} />
          </div>
        ))}
      </div>
    </div>
  );
}