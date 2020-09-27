<template>
    <footer class="flex-container">
        <div class='left-column' v-on:click="showClimateDetailsDialog = true">
            <!--
            <kommandoran-footer-climate
                :climate = "climate"
                :mediaWidthMoreThan400px = "mediaWidthMoreThan400px" />
            <v-dialog v-model="showClimateDetailsDialog"
                max-width="70%">                    
                <kommandoran-footer-climate-details
                    :climate="climate" 
                    :mediaWidthMoreThan400px = "mediaWidthMoreThan400px"  />
            </v-dialog>
            -->
        </div>
        <div class='center-column' v-on:click="showTransportDetailsDialog = true">
                <kommandoran-footer-transport />
                <!--
                <v-dialog v-model="showTransportDetailsDialog"
                    max-width="70%">
                    <kommandoran-footer-transport-details
                    :mediaWidthMoreThan400px = "mediaWidthMoreThan400px" />
                </v-dialog>
                -->
        </div>
        <div class='right-column'>asd
            <kommandoran-footer-time />
        </div>
    </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import KommandoranFooterTime from './KommandoranFooterTime.vue';
import KommandoranFooterTransport from './KommandoranFooterTransport.vue';
@Component({
    components: {
        KommandoranFooterTime,
        KommandoranFooterTransport
    },
})
export default class KommandoranFooter extends Vue {
    
}
</script>

<style scope>
    .flex-container {
        border: 1px solid black;
        display: flex;        
        justify-content: space-between;
    }
    footer {
        font-size: 0.8rem;
        line-height: 1.1rem;
        width: 100%;
        /*padding: 0 0.3rem 0 0.3rem;*/
    }
    footer > div {
        display: flex;
        flex-direction: column;
        margin-bottom: -4px;

        height: 32px;
    }
    @media only screen and (min-width: 401px) {
        .center-column {
        }

    }
    @media only screen and (max-width: 400px) {
        footer {
            font-size: small;
        }
        .left-column {
            width: 20%;
        }
        .center-column {
        }
    }
</style>