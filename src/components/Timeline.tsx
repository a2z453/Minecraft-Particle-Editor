import React from 'react';
import { useScene } from '../states/SceneContext';
import KeyframeEditor from '../utils/KeyframeEditor';

export default function Timeline() {
  const { timeline, addKeyframe, removeKeyframe } = useScene();

  return (
    <div className="h-full p-2">
      <h2 className="font-semibold">Animation Timeline</h2>
      <KeyframeEditor
        keyframes={timeline}
        onAdd={addKeyframe}
        onRemove={removeKeyframe}
      />
    </div>
);
}