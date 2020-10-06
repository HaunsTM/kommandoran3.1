<template>
	<article class="flex-container" v-if="lundDeparture && lundDeparture">
        <div class="flex-container column">
                <img :src="require(`@/assets/bus32x32.png`)" />
        </div>
        <div class="flex-container column">
            <div class="flex-container">

               <div class="flex-container column">
                    <div class="current-ride">
                        <span class="line-info">{{lundDeparture.lines[0].journeyDateTime}}</span>                   
                    </div>
                    <div class="current-ride">
                        <span class="line-info">{{malmoDeparture.lines[0].journeyDateTime}}</span>                   
                    </div>
                </div>
                
                <div class="flex-container column">
                    <span class="next-ride">
                        <span>({{lundDeparture.lines[1].name}}</span>
                        <span>{{lundDeparture.lines[1].journeyDateTime}})</span>
                    </span>
                     <span class="next-ride">
                        <span>({{malmoDeparture.lines[1].name}}</span>
                        <span>{{malmoDeparture.lines[1].journeyDateTime}})</span>
                    </span>
                </div>
 
            </div>
        </div>
    </article>
</template>

<script lang="ts">


import { Component, Watch, Vue } from 'vue-property-decorator';


import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { namespace } from 'vuex-class';

import AllTransportData from '@/helpers/allTransportData';
import IAllTransportData from '@/interfaces/iAllTransportData';
import IDeparture from '@/interfaces/iDeparture';

const TransportData = namespace('TransportData');

@Component({
    components: {
    },
})
export default class KommandoranFooterTransport extends Vue {
    /** Screensaver */
    @TransportData.Getter
    private currentTransportData!: IAllTransportData;
    
    public get transportData(): IAllTransportData {
        return this.currentTransportData;
    }

    public get departures(): IDeparture[] | null {
        if (this.currentTransportData) {
            return this.currentTransportData.Departures;
        }
        return null;
    }

    public get lundDeparture(): IDeparture | undefined {
        const lundDeparture = 
            this.currentTransportData?.Departures?.find( (d) => {
                const correctCity = d.city.toLowerCase() == 'lund';
                return correctCity
            })

        return lundDeparture;
    }

    public get malmoDeparture(): IDeparture | undefined {
        const malmoDeparture = 
            this.currentTransportData?.Departures?.find( (d) => {
                const correctCity = d.city.toLowerCase() == 'malmö';
                return correctCity
            })

        return malmoDeparture;
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
