import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(
    qiankunWindow.__POWERED_BY_QIANKUN__ ? '/richText/' : '/child/richText/',
  ),
  routes: [
    {
      path: '/',
      name: 'CkEditor',
      component: () => import('../views/Home/index.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到页面顶部
    return { left: 0, top: 0 };
  },
});

export default router;
