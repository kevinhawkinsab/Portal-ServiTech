import { createRouter, createWebHistory } from 'vue-router';
import { baseRoutes } from './routes.base';
import { moduleRoutes } from './routes.modules';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [...baseRoutes, ...moduleRoutes]
});

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (to.meta?.roles && !to.meta.roles.includes(auth.role)) {
    return '/citas';
  }
  return true;
});

export default router;
