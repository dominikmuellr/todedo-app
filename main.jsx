// Imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App.jsx'
import './src/style.css'
import { registerSW } from 'virtual:pwa-register'

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
})

console.log('PWA Debug - Service worker registration initiated, updateSW:', updateSW);

// Debug: Check manifest and PWA readiness
console.log('PWA Debug - Checking manifest and PWA criteria...');
fetch('/todo-app/manifest.json')
  .then(response => response.json())
  .then(manifest => {
    console.log('PWA Debug - Manifest loaded:', manifest);
  })
  .catch(error => {
    console.error('PWA Debug - Manifest load failed:', error);
  });

// Make updateSW available globally for PWA update notifications
window.updateSW = updateSW; 