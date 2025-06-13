import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { SceneProvider } from './state/SceneContext'; // <- ✅ import this

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SceneProvider>  {/* ✅ Wrap App in SceneProvider */}
      <App />
    </SceneProvider>
  </React.StrictMode>
);
