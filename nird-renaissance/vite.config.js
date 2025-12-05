import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['gsap', '@studio-freight/lenis'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData removed - using explicit imports instead
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
