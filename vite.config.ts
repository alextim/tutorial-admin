import { defineConfig, loadEnv  } from 'vite';
// import react from '@vitejs/plugin-react-swc';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')};

  return defineConfig({
    server: {
      proxy: {
        '/uploads': {
          target: process.env.VITE_UPLOADS_URL,
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/uploads/, "/uploads"),
        },
      },
    },
    build: {
      minify: false,
    },
    plugins: [react()],
  });
};
