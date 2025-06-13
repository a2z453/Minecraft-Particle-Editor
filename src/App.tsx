// src/App.tsx
import React from 'react';
import Viewport from './components/Viewport';
import Inspector from './components/Inspector';
import Toolbar from './components/Toolbar';
import { SceneProvider } from './states/SceneContext';

export default function App() {
  return (
    <SceneProvider>
      <div className="flex h-screen">
        <div className="w-64 bg-gray-100 p-4">
          <Inspector />
        </div>
        <div className="flex-1 relative">
          <Viewport />
          <Toolbar />
        </div>
      </div>
    </SceneProvider>
  );
}