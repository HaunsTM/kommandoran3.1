import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeAssistant from '../views/HomeAssistant.vue';
import ScreenSaver from '../views/ScreenSaver.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'HomeAssistant',
    component: HomeAssistant,
  },
  {
    path: '/home-assistant',
    name: 'HomeAssistant',
    component: HomeAssistant,
  },
  {
    path: '/screen-saver',
    name: 'ScreenSaver',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ScreenSaver.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
