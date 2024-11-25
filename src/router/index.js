import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/index.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到页面顶部
    return { left: 0, top: 0 };
  },
});

export default router;
