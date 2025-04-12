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
      }
    })
  ]
})

