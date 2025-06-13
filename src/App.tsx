import React from 'react';
import Viewport from './components/Viewport';
import Toolbar from './components/Toolbar';
import Inspector from './components/Inspector';
import Timeline from './components/Timeline';

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-12 bg-gray-800 text-white flex items-center px-4">
        <h1 className="text-lg font-semibold">Minecraft Particle Editor</h1>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-gray-100 p-2 overflow-y-auto">
          <Toolbar />
          <Inspector />
        </aside>
        <main className="flex-1 relative">
          <Viewport />
        </main>
      </div>
      <footer className="h-32 bg-gray-200">
        <Timeline />
      </footer>
    </div>
  );
}