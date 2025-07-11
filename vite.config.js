// Imports
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Plugins
  plugins: [react(), tailwindcss()],

  // Development Server
  server: {
    port: 3000,
    open: true, 
    host: true, 
  },
  
  // Build Configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, 
    minify: 'terser', 
    target: 'es2015', 
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  
  // CSS Configuration
  css: {
    devSourcemap: true, 
  },
  
  // Preview Server
  preview: {
    port: 4173,
    open: true,
  },
  
  // Base Path
  base: '/todo-app/',
}) 