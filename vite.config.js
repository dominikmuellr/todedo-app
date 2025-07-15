// Imports
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Plugins
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module'
      },
      includeAssets: ['favicon.svg', 'icon.svg', 'pwa-192x192.svg', 'pwa-512x512.svg'],
      manifest: false, // Use our custom manifest.json instead
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      }
    })
  ],

  // Development Server
  server: {
    port: 3000,
    open: true, 
    host: true,
    https: false, // Set to true for full PWA testing, but requires SSL certificates
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
  base: '/todedo-app/',
}) 