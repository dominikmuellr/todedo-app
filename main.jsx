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