/*https://bezkoder.com/vuex-typescript-jwt-auth/*/
import Vue from "vue";
import Vuex from "vuex";

import ScreenSaver from "./modules/screenSaver.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ScreenSaver
  }
});