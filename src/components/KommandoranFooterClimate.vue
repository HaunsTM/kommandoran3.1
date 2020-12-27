<template>
    <v-carousel hide-delimiter-background hide-delimiters :show-arrows="false" height="2rem" cycle interval="6000">
        <v-carousel-item transition="fade">
            <div class="flex-container temperatureText">
                <div>
                    <img :src="require(`@/assets/air-conditioner24x24.png`)" />
                </div>                
                <div v-if="currentMainThermostatData" >
                    <span :class="cssTemperature(currentMainThermostatData.current_temperature)">{{currentMainThermostatData.current_temperature}}</span><span> °C</span>
                </div>
                <div v-if="currentUtilityRoomData && currentOutdoorRoomData">
                    <v-carousel hide-delimiter-background hide-delimiters :show-arrows="false" height="2rem" cycle interval="800">
                        <v-carousel-item transition="scroll-x-transition">
                                <div class="flex-container column justify-content-center temperatureText">
                                    <div class="small">
                                        Grovkök:
                                    </div>
                                    <div>
                                        <span :class="cssTemperature(currentUtilityRoomData.current_temperature)">{{currentUtilityRoomData.current_temperature}}</span><span> °C</span>
                                    </div>
                                </div>
                        </v-carousel-item>
                        <v-carousel-item transition="scroll-x-transition">
                                <div class="flex-container column justify-content-center temperatureText">
                                    <div class="small">
                                        Uterum:
                                    </div>
                                    <div>
                                        <span :class="cssTemperature(currentOutdoorRoomData.current_temperature)">{{currentOutdoorRoomData.current_temperature}}</span><span> °C</span>
                                    </div>
                                </div>
                        </v-carousel-item>
                    </v-carousel>
                </div>
            </div>
        </v-carousel-item>
        <v-carousel-item transition="scroll-x-transition"  v-if="currentOutdoorData">
            <div class="temperatureText">
                <span>Utomhus: </span><span :class="cssTemperature(currentOutdoorData.current_temperature)">{{currentOutdoorData.current_temperature}}</span><span> °C</span>
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { namespace } from 'vuex-class';

import AllTransportData from '@/helpers/allTransportData';
import IAllTransportData from '@/interfaces/iAllTransportData';
import IIndoorClimate from '@/interfaces/iIndoorClimate';
import IOutdoorClimate from '@/interfaces/iOutdoorClimate';

const IndoorUtilityRoomData = namespace('IndoorUtilityRoomData');
const IndoorMainThermostatData = namespace('IndoorMainThermostatData');
const IndoorOutdoorRoomData = namespace('IndoorOutdoorRoomData');
const OutdoorData = namespace('OutdoorData');

@Component
export default class KommandoranFooterClimate extends Vue {
        
    /** Climate */
    @IndoorUtilityRoomData.Getter
    private currentUtilityRoomData!: IIndoorClimate;
    @IndoorMainThermostatData.Getter
    private currentMainThermostatData!: IIndoorClimate;
    @IndoorOutdoorRoomData.Getter
    private currentOutdoorRoomData!: IIndoorClimate;
    @OutdoorData.Getter
    private currentOutdoorData!: IOutdoorClimate;

    public get mediaWidthMoreThan400px(): boolean {return true;}

    private cssTemperature(temperatureString: string): string {

        const temperature = Number(temperatureString);
        let cssTemperature =  "NO_CSS"

        switch (true) {
            case ( temperature <= -5 ):
                cssTemperature = "very-cold";
                break;
            
            case ( -5 < temperature && temperature < 0 ):
                cssTemperature = "cold";
                break;

            case ( 0 <= temperature && temperature < 13 ):
                cssTemperature = "not-freezing";
                break;

            case ( 13 <= temperature ):
                cssTemperature = "warm";
                break;
        }

        return cssTemperature;
    }

}
</script>

<style scope>
    .flex-container {
        display: flex;
        align-items: center;
    }
    .temperatureText {
        color: black;
    }
    .column {
        flex-direction: column;
    }
    .justify-content-center {
        justify-content: center;
    }
    .indoor-icon {
        padding-right: 0.2rem;
    }
    .small {
        font-size: 0.5rem;
    }
    .very-cold {
        color: darkblue;
    }
    .cold {
        color: deepskyblue;
    }
    .not-freezing {
        color: black;
    }
    .warm {
        color: red;
    }
    @media only screen and (max-width: 400px) {
        .weather-icon {
            width: 30px;
        }
        .outdoor-text {
            padding-bottom: 0.4rem;
        }
    }
    @media only screen and (min-width: 401px) {
        .outdoors {
            padding-left: 1rem;
        }
        .weather-icon {
            width: 32px;
        }
    }
</style>