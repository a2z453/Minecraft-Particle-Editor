  import React from 'react';
  import { useScene } from '../states/SceneContext';
  
  export default function Inspector() {
    const { selectedEmitter, updateEmitter } = useScene();
    if (!selectedEmitter) return <div>Select an emitter to view properties</div>;
  
    const handleChange = (field, value) => {
      updateEmitter(selectedEmitter.id, { [field]: value });
    };
  
    return (
      <div className="mt-4">
        <h2 className="font-semibold">Inspector</h2>
        <div className="space-y-2">
          <label className="block text-sm">Type</label>
          <select value={selectedEmitter.type} onChange={e => handleChange('type', e.target.value)} className="w-full p-1 border rounded">
            {['flame','smoke','dust','crit'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <label className="block text-sm">Color</label>
          <input type="color" value={selectedEmitter.color} onChange={e => handleChange('color', e.target.value)} className="w-full h-8 p-0 border rounded" />
          <label className="block text-sm">Lifetime</label>
          <input type="number" value={selectedEmitter.properties.lifetime} onChange={e => handleChange('properties.lifetime', +e.target.value)} className="w-full p-1 border rounded" />
          <label className="block text-sm">Spawn Rate</label>
          <input type="range" min="1" max="100" value={selectedEmitter.properties.spawnRate} onChange={e => handleChange('properties.spawnRate', +e.target.value)} className="w-full" />
        </div>
      </div>
  );
  }