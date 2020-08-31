<template>
  <v-app dark>

    <router-view></router-view>
    <v-footer app>
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataService from './api/DataService';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

@Component({
    components: {
    },
})
export default class App extends Vue {

    private enterScreenSaverMode(): boolean {
         return this.$store.getters.enterScreenSaverMode;
    }
}
</script>

