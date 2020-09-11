<template>
  <v-app dark>

    <router-view></router-view>
    <v-footer app>
      <v-col
        class="text-center"
        cols="12"
      >
        <kommandoran-footer />
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataService from './api/DataService';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';


import KommandoranFooter from '@/components/KommandoranFooter.vue';

import { OnIdle, OnActive } from 'vue-plugin-helper-decorator';

@Component({
    components: {
      KommandoranFooter
    },
})
export default class App extends Vue {

    private enterScreenSaverMode(): boolean {
         return this.$store.getters.enterScreenSaverMode;
    }
  private navigateTo(routeName: string): void {
      this.$router.push({ name: routeName })
      
		}
    
  @OnIdle()
  public whenIdle() {
		this.navigateTo('ScreenSaver');
  }
  
  @OnActive()
  public whenActive() {
		this.navigateTo('HomeAssistant');
  }
   private created(): void {
    console.log('propertyComputed will update, as this.property is now reactive.')
  }
}
</script>

