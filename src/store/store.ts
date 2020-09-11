import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiBaseUrl: "http://10.0.0.6:8123",
    enterScreenSaverMode: false
  },
  getters: {
    apiBaseUrl: state => {
        return state.apiBaseUrl;
    }
  },
  mutations: {
    setScreenSaver(state, displayed) {
      state.enterScreenSaverMode = displayed;
    }
  },
  actions: {
    setScreenSaver(context, displayed) {
      context.commit('setScreenSaver', displayed)
    }
  },
});
// https://itnext.io/vuex-made-simple-getting-started-6bf229d432cf