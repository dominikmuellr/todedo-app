// Imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App.jsx'
import './src/style.css'

// Theme Initialization
const savedTheme = localStorage.getItem('react-theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
}

// React App Rendering
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// PWA Service Worker Registration
async function initializePWA() {
  // Only initialize PWA in production builds
  if (import.meta.env.PROD) {
    try {
      // Use eval to completely hide the import from Vite's static analysis
      const importPath = 'virtual:pwa-register';
      const pwaModule = await eval(`import('${importPath}')`);
      const { registerSW } = pwaModule;
      console.log('PWA Debug - Starting service worker registration...');
      
      const updateSW = registerSW({
        onNeedRefresh() {
          console.log('PWA Debug - SW update available');
          window.dispatchEvent(new CustomEvent('sw-update-available'));
        },
        onOfflineReady() {
          console.log('PWA Debug - App ready to work offline');
        },
        onRegistered(registration) {
          console.log('PWA Debug - Service worker registered successfully:', registration);
        },
        onRegisterError(error) {
          console.error('PWA Debug - Service worker registration failed:', error);
        }
      });

      console.log('PWA Debug - Service worker registration initiated, updateSW:', updateSW);
      
      // Make updateSW available globally for PWA update notifications
      window.updateSW = updateSW;
    } catch (error) {
      console.log('PWA not available in this build mode:', error.message);
    }
  } else {
    console.log('PWA disabled in development mode');
  }
}

// Initialize PWA
initializePWA(); 