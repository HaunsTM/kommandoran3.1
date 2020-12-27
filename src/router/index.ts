import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'HomeAssistant',
    component: () => import('@/views/HomeAssistant.vue'),
  },
  {
    path: '/home-assistant',
    name: 'HomeAssistant',
    component: () => import('@/views/HomeAssistant.vue'),
  },
  {
    path: '/screen-saver',
    name: 'ScreenSaver',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/ScreenSaver.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
