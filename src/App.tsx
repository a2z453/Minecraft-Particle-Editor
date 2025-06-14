import React, { useState } from 'react';
import Viewport from './components/Viewport';
import Toolbar from './components/Toolbar';
import Inspector from './components/Inspector';
import Timeline from './components/Timeline';
import Exporter from './components/Exporter';

export default function App() {
  const [showExporter, setShowExporter] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <header className="h-12 bg-gray-800 text-white flex items-center px-4">
        <h1 className="text-lg font-semibold">Minecraft Particle Editor</h1>
        <button
          onClick={() => setShowExporter(true)}
          className="ml-auto px-2 py-1 bg-blue-500 rounded hover:bg-blue-600"
        >
          Export
        </button>
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
      {showExporter && <Exporter onClose={() => setShowExporter(false)} />}
    </div>
  );
}