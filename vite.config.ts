import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 重要：设置为你的仓库名称，例如 /ear-lab/
  // 如果你的仓库名是 ear-lab，请改为 '/ear-lab/'
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
