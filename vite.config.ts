import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/uploads/, "/uploads"),
      },
    },
  },

  plugins: [react()],
});
