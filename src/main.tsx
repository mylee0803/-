import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const validateEnv = () => {
  const requiredVars = [
    'VITE_N8N_LIST_URL',
    'VITE_N8N_WEBHOOK_URL',
    'VITE_N8N_ANALYSIS_WEBHOOK_URL'
  ];

  const missing = requiredVars.filter(key => !import.meta.env[key]);

  if (missing.length > 0) {
    const msg = `[CRITICAL] Missing Environment Variables:\n${missing.join('\n')}\n\nPlease check .env file!`;
    console.error(msg);
    alert(msg); // Alert removed to allow rendering
  }
};

validateEnv();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// PWA Auto-reload when new content is available
// This is a simple fallback if VitePWA 'autoUpdate' needs a nudge
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (installingWorker) {
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('New content available, reloading...');
            window.location.reload();
          }
        };
      }
    };
  });
} 
