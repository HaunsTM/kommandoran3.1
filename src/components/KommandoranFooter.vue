<template>
    <footer>
            <div v-on:click="showClimateDetailsDialog = true">
                <kommandoran-footer-climate />
                  <!--    <v-dialog v-model="showClimateDetailsDialog"
                        max-width="70%">                    
                        <kommandoran-footer-climate-details
                            :climate="climate" 
                            :mediaWidthMoreThan400px = "mediaWidthMoreThan400px"  />
                    </v-dialog>
                    -->
            </div>
            <div v-on:click="showTransportDetailsDialog = true">
                <kommandoran-footer-transport />
                <v-dialog v-model="showTransportDetailsDialog"
                    max-width="70%">
                    <kommandoran-footer-transport-details @close="closeTransportDetails"/>
                </v-dialog>
            </div>
            <div>
                <kommandoran-footer-time />
            </div>
    </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import KommandoranFooterClimate from './KommandoranFooterClimate.vue';
import KommandoranFooterTime from './KommandoranFooterTime.vue';
import KommandoranFooterTransport from './KommandoranFooterTransport.vue';
import KommandoranFooterTransportDetails from './KommandoranFooterTransportDetails.vue';

@Component({
    components: {
        KommandoranFooterClimate,
        KommandoranFooterTime,
        KommandoranFooterTransport,
        KommandoranFooterTransportDetails
    },
})
export default class KommandoranFooter extends Vue {
    public showTransportDetailsDialog = false;

    public closeTransportDetails(): void {
        this.showTransportDetailsDialog = false;
    }
}
</script>

<style scope>
    footer {
        display: flex;        
        justify-content: space-between;
        font-size: 0.8rem;
        line-height: 1.1rem;
        width: 100%;
        /*padding: 0 0.3rem 0 0.3rem;*/
    }
    footer > div {
        display: flex;
        flex-direction: column;

    }
</style>