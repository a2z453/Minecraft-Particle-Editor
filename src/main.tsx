import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles.css';
import { SceneProvider } from './states/SceneContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SceneProvider>
      <App />
    </SceneProvider>
  </React.StrictMode>
);