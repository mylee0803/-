import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt', // Manual update control
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        clientsClaim: true,
        skipWaiting: false // Configured for manual update flow
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: '와인 다이어리 (Wine Diary) v1.1',
        short_name: 'Wine Diary',
        description: '나만의 스마트한 와인 기록장',
        theme_color: '#EF1403',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    host: true,
    port: 5173, // Fixed to 5173 to avoid n8n (5678) conflict
    strictPort: false, // Allow fallback to next port if 5173 is busy
  },
  preview: {
    host: true,
    port: 5173, // Fixed to 5173 to avoid n8n (5678) conflict
    strictPort: true,
    allowedHosts: ['unscarved-dictatorially-dulce.ngrok-free.dev']
  }
})
