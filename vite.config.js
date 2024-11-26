import { fileURLToPath, URL } from 'node:url';

import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import qiankun from 'vite-plugin-qiankun';

// https://vite.dev/config/
export default ({ command, mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), 'env'));
  const { VITE_PUBLIC_PATH } = env;
  return defineConfig({
    server: {
      host: true, // 设置为 true 以启用网络访问
      base: VITE_PUBLIC_PATH, //必须和基座也就是主应用的activeRule值一致
      proxy: {
        '/api': {
          target: 'http://localhost:3030', // 目标地址
          changeOrigin: true, // 支持跨域
        },
      },
    },
    plugins: [
      vue(),
      qiankun('apps', {
        useDevMode: true,
      }),
    ],
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
};
