import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ⚠️ ESSENTIAL for Vercel deployment to work
  base: "./",

  server: {
    port: 3000,       // Local development port
    open: true        // Automatically opens browser when running npm run dev
  },

  build: {
    outDir: 'dist',   // Build output folder
    sourcemap: true,  // Optional: generates sourcemaps for debugging in production
  },

  resolve: {
    alias: {
      '@': '/src',    // Allows imports like "@/components/MyComponent"
    },
  },
});
