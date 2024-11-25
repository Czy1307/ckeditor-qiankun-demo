import './public-path';

import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
import ElementPlus from 'element-plus';

import App from './App.vue';
import router from './router';

// 导入tailwind.css，防止vite每次hmr都会请求,导致热更新慢的问题
import './styles/tailwindInput.css';

// 导入ckeditor样式
import 'ckeditor5/ckeditor5.css';

import 'element-plus/dist/index.css';

let instance = null;

function render(props = {}) {
  const { container } = props;

  instance = createApp(App);
  instance.use(createPinia());
  instance.use(ElementPlus);
  instance.use(CkeditorPlugin);
  instance.use(router);

  instance.mount(
    container ? container.querySelector('#rich-text') : '#rich-text',
  );
}
// const app = createApp(App);

// app.use(createPinia());
// app.use(ElementPlus);
// app.use(CkeditorPlugin);
// app.use(router);

// app.mount('#app');
