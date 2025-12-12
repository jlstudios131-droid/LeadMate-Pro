import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    })
  ],

  server: {
    port: 3000,
    open: true,
    cors: true
  },

  build: {
    outDir: 'dist',
    sourcemap: false, // mais leve no deploy
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // chunking premium e seguro para produção
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
    }
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-hot-toast'
    ]
  }
})
