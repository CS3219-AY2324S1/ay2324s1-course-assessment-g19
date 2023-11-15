import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true
    },
    strictPort: true,
    hmr: {
      clientPort: 3000
    }
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true
      }
    })
  ]
});
