/*https://bezkoder.com/vuex-typescript-jwt-auth/*/
import Vue from "vue";
import Vuex from "vuex";

import ScreenSaver from "./modules/screenSaver.module";
import TransportData from "./modules/transportData.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ScreenSaver,
    TransportData
  }
});