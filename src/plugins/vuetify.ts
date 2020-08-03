import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import sv from 'vuetify/src/locale/sv';

export default new Vuetify({
  lang: {
    locales: { sv },
    current: 'sv',
  },
});

Vue.use(Vuetify);
