/** @type {import('tailwindcss').Config} */
export default {
  // Content Configuration
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./main.jsx"
  ],

  // Theme Extension
  theme: {
    extend: {
      // Colors mapped from CSS variables
      colors: {
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        'primary-container': 'var(--color-primary-container)',
        'on-primary-container': 'var(--color-on-primary-container)',
        
        secondary: 'var(--color-secondary)',
        'on-secondary': 'var(--color-on-secondary)',
        'secondary-container': 'var(--color-secondary-container)',
        'on-secondary-container': 'var(--color-on-secondary-container)',
        
        tertiary: 'var(--color-tertiary)',
        'on-tertiary': 'var(--color-on-tertiary)',
        'tertiary-container': 'var(--color-tertiary-container)',
        'on-tertiary-container': 'var(--color-on-tertiary-container)',
        
        error: 'var(--color-error)',
        'on-error': 'var(--color-on-error)',
        'error-container': 'var(--color-error-container)',
        'on-error-container': 'var(--color-on-error-container)',
        
        warning: 'var(--color-warning)',
        'on-warning': 'var(--color-on-warning)',
        'warning-container': 'var(--color-warning-container)',
        'on-warning-container': 'var(--color-on-warning-container)',
        
        background: 'var(--color-background)',
        'on-background': 'var(--color-on-background)',
        surface: 'var(--color-surface)',
        'on-surface': 'var(--color-on-surface)',
        'surface-variant': 'var(--color-surface-variant)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        outline: 'var(--color-outline)',
        'outline-variant': 'var(--color-outline-variant)',
        'surface-container-lowest': 'var(--color-surface-container-lowest)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'surface-container': 'var(--color-surface-container)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'surface-container-highest': 'var(--color-surface-container-highest)',
      },
      // Box Shadow mapped from CSS variables
      boxShadow: {
        'elevation-1': 'var(--shadow-elevation-1)',
        'elevation-2': 'var(--shadow-elevation-2)',
        'elevation-3': 'var(--shadow-elevation-3)',
      },
      // Font Family
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },

  // Plugins
  plugins: [],
} 