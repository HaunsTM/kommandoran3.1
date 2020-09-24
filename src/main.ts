import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import vuetify from './plugins/vuetify';
import IdleVue from 'idle-vue';

Vue.config.productionTip = false;


const SCREENSAVER_IDLE_TIME_BEFORE_START_MS = (10 * 1000);

const eventsHub = new Vue();

Vue.use(IdleVue, { 
  idleTime: SCREENSAVER_IDLE_TIME_BEFORE_START_MS,
  eventEmitter: eventsHub,
  store });



new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
