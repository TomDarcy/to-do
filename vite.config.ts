import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'An example of a Progressive Web App',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2196f3',
        icons: [
          {
            src: '/images/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
