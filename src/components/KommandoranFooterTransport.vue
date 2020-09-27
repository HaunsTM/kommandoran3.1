<template>
	
    <article class="flex-container">
    <!--<article class="flex-container" v-if="transportData['Lund'] && transportData['Malmö']">
        <div class="flex-container column">
                <img :src="require(`@/assets/bus32x32.png`)" />
        </div>
        <div class="flex-container column">
            <div class="flex-container">

               <div class="flex-container column">
                    <div class="current-ride">
                        <span class="line-info">{{transportData['Lund'][0].Name}}</span>                   
                    </div>
                    <div class="current-ride">
                        <span class="line-info">{{transportData['Malmö'][0].Name}}</span>                   
                    </div>
                </div>
                <div class="flex-container column" v-if="mediaWidthMoreThan400px">
                    <div class="current-ride">
                        <span class="line-info">{{transportData['Lund'][0].Towards.substring(0, 10)}}</span>                   
                    </div>
                    <div class="current-ride">
                        <span class="line-info">{{transportData['Malmö'][0].Towards.substring(0, 10)}}</span>                   
                    </div>
                </div>
                
               <div class="flex-container column">
                    <div class="current-ride">
                        <span class="scheduled-departure">{{transportData['Lund'][0].JourneyTime}}</span>               
                    </div>
                    <div class="current-ride">
                        <span class="scheduled-departure">{{transportData['Malmö'][0].JourneyTime}}</span>                   
                    </div>
                </div>
                
                <div class="flex-container column" v-if="mediaWidthMoreThan400px">
                    <span class="next-ride">
                        <span>({{transportData['Lund'][1].Name}}</span>
                        <span>{{transportData['Lund'][1].JourneyTime}})</span>
                    </span>
                     <span class="next-ride">
                        <span>({{transportData['Malmö'][1].Name}}</span>
                        <span>{{transportData['Malmö'][1].JourneyTime}})</span>
                    </span>
                </div>
 
            </div>
        </div>-->
        {{transportData}}
    </article>
</template>

<script lang="ts">


import { Component, Watch, Vue } from 'vue-property-decorator';


import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { namespace } from 'vuex-class';

import AllTransportData from '@/helpers/allTransportData';
import IAllTransportData from '@/interfaces/iAllTransportData';
const TransportData = namespace('TransportData');

@Component({
    components: {
    },
})
export default class KommandoranFooterTransport extends Vue {
    /** Screensaver */
    @TransportData.Getter
    private currentTransportData!: AllTransportData;
    
    @Watch('currentTransportData')
    private transportData(value: IAllTransportData, oldValue: IAllTransportData): IAllTransportData {
        return this.currentTransportData;
    }    
}
</script>

<style scope>
    .flex-container {
        display: flex;
    }
    .column {
        flex-direction: column;
    }
    .current-ride {
        font-weight: bolder;
    }
    .current-ride > span {
        padding-left: 1rem;
    }
    .line-info {
        font-weight: lighter;
    }
    .scheduled-departure {
        font-weight: bold;
    }
    .next-ride {
        font-weight: lighter;
    }
    .next-ride > span {
        padding-left: 1rem;
    }
</style>
