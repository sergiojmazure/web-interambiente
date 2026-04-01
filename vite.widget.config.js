import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  build: {
    outDir: 'public/widgets',
    emptyOutDir: false, 
    lib: {
      entry: resolve(__dirname, 'src/widget.jsx'),
      name: 'InterambienteSello',
      formats: ['iife'],
      fileName: () => 'sello.js'
    },
    rollupOptions: {
      // Pack everything so there are no external dependencies for the client
    }
  }
});
