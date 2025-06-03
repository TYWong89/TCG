import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // or wherever your API runs
        changeOrigin: true,
        secure: false,
      },
    },
  },
});