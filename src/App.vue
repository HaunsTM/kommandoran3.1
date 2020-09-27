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
    <services />
  </v-app>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import DataService from './api/dataService';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

import KommandoranFooter from '@/components/KommandoranFooter.vue';
import Services from '@/components/Services.vue';

import { OnIdle, OnActive } from 'vue-plugin-helper-decorator';

import { namespace } from 'vuex-class';
const ScreenSaver = namespace('ScreenSaver');

@Component({
    components: {
      KommandoranFooter,
      Services
    },
})
export default class App extends Vue {

    /** Screensaver */
    @ScreenSaver.State
    private shouldEnterScreenSaverMode!: boolean;
    @ScreenSaver.Action
    private updateDisplayStatus!: (displayed: boolean) => void;
    
    @Watch('shouldEnterScreenSaverMode')
    onShouldEnterScreenSaverModeChanged(value: string, oldValue: string) {
        if(this.shouldEnterScreenSaverMode) {
            this.navigateTo('ScreenSaver');
        } else {
            this.navigateTo('HomeAssistant');
        }
    }

    private navigateTo(routeName: string): void {
        this.$router.push({ name: routeName })        
    }
    
    @OnIdle()
    public async whenIdle() {
        const displayed = true;
        this.updateDisplayStatus(displayed);
    }
    
    @OnActive()
    public async whenActive() {
        const displayed = false;
        this.updateDisplayStatus(displayed);
    }

}
</script>

