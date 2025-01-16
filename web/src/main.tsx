import React from 'react';
import ReactDOM from 'react-dom/client';
import { VisibilityProvider } from './providers/VisibilityProvider';
import App from './App';
import './index.css';
import RouteProvider from './providers/RouteProvider';
import { ContextProvider } from './providers/ContextProvider';
import { NuiProvider } from './providers/NuiProvider';
import GameNotifyProvider from './providers/GameNotifyProvider';
import { Toaster } from './components/ui/sonner';
import { GameReportsProvider } from './providers/GameReportsProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NuiProvider>
      <ContextProvider>
        <div
          style={{ height: "100%" }}
          className='dark'
        >
          <VisibilityProvider>
            <GameReportsProvider>
              <RouteProvider />
            </GameReportsProvider>
          </VisibilityProvider>
          <GameNotifyProvider />
          <Toaster />
        </div>
      </ContextProvider>
    </NuiProvider>
  </React.StrictMode>,
);
