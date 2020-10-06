/*https://bezkoder.com/vuex-typescript-jwt-auth/*/
import Vue from "vue";
import Vuex from "vuex";

import IndoorGrovkokData from "./modules/indoorGrovkokData.module";
import IndoorHuvudtermostatData from "./modules/indoorHuvudtermostatData.module";
import IndoorUterumData from "./modules/indoorUterumData.module";
import OutdoorData from "./modules/outdoorData.module";

import ScreenSaver from "./modules/screenSaver.module";
import TransportData from "./modules/transportData.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    IndoorGrovkokData,
    IndoorHuvudtermostatData,
    IndoorUterumData,
    OutdoorData,
    ScreenSaver,
    TransportData,
  }
});