/*https://bezkoder.com/vuex-typescript-jwt-auth/*/
import Vue from "vue";
import Vuex from "vuex";

import IndoorUtilityRoomData from "./modules/indoorUtilityRoomData.module";
import IndoorMainThermostatData from "./modules/indoorMainThermostatData.module";
import IndoorOutdoorRoomData from "./modules/indoorOutdoorRoomData.module";
import OutdoorData from "./modules/outdoorData.module";

import ScreenSaverData from "./modules/screenSaverData.module";
import SoundData from "./modules/soundData.module";
import TransportData from "./modules/transportData.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    IndoorUtilityRoomData,
    IndoorMainThermostatData,
    IndoorOutdoorRoomData,
    OutdoorData,
    ScreenSaverData,
    SoundData,
    TransportData,
  }
});