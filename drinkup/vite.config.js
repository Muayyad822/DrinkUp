import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['water-drop.png', 'favicon.svg', 'notification-worker.js'],
      manifest: {
        name: 'DrinkUp',
        short_name: 'DrinkUp',
        description: 'Water intake tracker for Teniola',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/water-drop.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/water-drop.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        swDest: 'notification-worker.js'
      }
    })
  ],
  build: {
    assetsDir: 'assets',
    copyPublicDir: true
  }
})




