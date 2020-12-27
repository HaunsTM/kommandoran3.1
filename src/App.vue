<template>
  <v-app dark>
        <v-dialog
            v-model="shouldEnterScreenSaverMode"
            dark
        >
            <screen-saver />
        </v-dialog>

    <router-view></router-view>

    <v-footer fixed>
         <kommandoran-footer class="kommandoran-footer" />
    </v-footer>
    <services />
    <sound />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataService from './api/dataService';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

import ScreenSaver from '@/views/ScreenSaver.vue';
import KommandoranFooter from '@/components/KommandoranFooter.vue';
import Services from '@/components/Services.vue';
import Sound from '@/components/Sound.vue';

import { OnIdle, OnActive } from 'vue-plugin-helper-decorator';

import { namespace } from 'vuex-class';
const ScreenSaverData = namespace('ScreenSaverData');

@Component({
    components: {
      KommandoranFooter,
      ScreenSaver,
      Services,
      Sound
    },
})
export default class App extends Vue {

    /** Screensaver */
    @ScreenSaverData.State
    private shouldEnterScreenSaverMode!: boolean;
    @ScreenSaverData.Action
    private updateDisplayStatus!: (displayed: boolean) => void;
    
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
<style scope>
    .kommandoran-footer {
        /*border: 1px solid red;*/
    }
</style>
