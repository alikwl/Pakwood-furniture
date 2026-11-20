import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Root-relative paths for custom domain pakwoodfurniture.store
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
