import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // 设置为 true 以启用网络访问
    proxy: {
      '/api': {
        target: 'http://localhost:3030', // 目标地址
        changeOrigin: true, // 支持跨域
      },
    },
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        api: 'modern',
      },
    },
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')], // 添加 Tailwind CSS 和 Autoprefixer
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
