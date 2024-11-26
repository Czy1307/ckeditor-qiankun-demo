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
import './styles/style.css';

import 'element-plus/dist/index.css';

import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper';

let instance = null;

function render(props = {}) {
  const { container } = props;

  instance = createApp(App);
  instance.use(createPinia());
  instance.use(ElementPlus);
  instance.use(CkeditorPlugin);
  instance.use(router);

  instance.mount(
    container ? container.querySelector('#richText') : '#richText',
  );
}

// 检查是否在 Qiankun 环境中运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
} else {
  renderWithQiankun({
    bootstrap() {
      console.log('Vue 应用启动');
    },
    mount(props) {
      console.log('[vue] 主框架传递的 props', props);

      render(props);
    },
    update() {
      console.log('Vue 应用更新');
    },
    unmount() {
      console.log('Vue 应用卸载');
      app?.unmount();
    },
  });
}
