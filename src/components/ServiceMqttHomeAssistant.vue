<template>
    <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { namespace } from 'vuex-class';
import mqtt, { MqttClient } from 'mqtt';

import AllTransportData from '@/helpers/allTransportData';
import IAllTransportData from '@/interfaces/iAllTransportData';
import IIndoorClimate from '@/interfaces/iIndoorClimate';
import IOutdoorClimate from '@/interfaces/iOutdoorClimate';
import IImage from '@/interfaces/iImage';

import DataService from '@/api/dataService';

const IndoorGrovkokData = namespace('IndoorGrovkokData');
const IndoorHuvudtermostatData = namespace('IndoorHuvudtermostatData');
const IndoorUterumData = namespace('IndoorUterumData');
const OutdoorData = namespace('OutdoorData');

const TransportData = namespace('TransportData');
const ScreenSaverData = namespace('ScreenSaver');

@Component
export default class ServiceMqttHomeAssistant extends Vue {
    
    /** Climate */
    @IndoorGrovkokData.Getter
    private currentGrovkokData!: IIndoorClimate;
    @IndoorGrovkokData.Action
    private updateCurrentGrovkokData!: (indoorGrovkokData: IIndoorClimate) => void;

    @IndoorHuvudtermostatData.Getter
    private currentHuvudtermostatData!: IIndoorClimate;
    @IndoorHuvudtermostatData.Action
    private updateCurrentHuvudtermostatData!: (indoorHuvudtermostatData: IIndoorClimate) => void;

    @IndoorUterumData.Getter
    private currentUterumData!: IIndoorClimate;
    @IndoorUterumData.Action
    private updateCurrentUterumData!: (indoorUterumData: IIndoorClimate) => void;

    @OutdoorData.Getter
    private currentOutdoorData!: IOutdoorClimate;
    @OutdoorData.Action
    private updateCurrentOutdoorData!: (outdoorData: IOutdoorClimate) => void;

    /** Image */
    @ScreenSaverData.Getter
    private currentScreensaverBase64ImageData!: string;
    @ScreenSaverData.Action
    private updateCurrentScreensaverImage!: (screensaverImage: IImage) => void;

    /** Transport */
    @TransportData.State
    private currentTransportData!: IAllTransportData;
    @TransportData.Action
    private updateCurrentTransportData!: (transportData: IAllTransportData) => void;
    
    /** hooks */
    private created(): void {
        this.startMqttService();
        console.log('component ServiceMqttHomeAssistant is now reactive.')
    }


    /** mqtt */
    public startMqttService(): void {
        try {
            const client = 
                mqtt.connect(
                    DataService.mqttHomeassistantConstructorParameters.brokerUrl,
                    DataService.mqttHomeassistantConstructorParameters.options);
            client.on("connect",async ()=>{this.onMqttConnected(client);});
            client.on("message",this.onMqttMessage);
        } catch (error) {
            console.error(error);
        }  
    }
    private async onMqttConnected(client: mqtt.Client): Promise<void> {
        try {
            await Promise.all([
                client.subscribe(DataService.mqttTopicSubscriptions.climate_grovkök_golv),
                client.subscribe(DataService.mqttTopicSubscriptions.climate_huvudtermostat),
                client.subscribe(DataService.mqttTopicSubscriptions.climate_uterum),
                client.subscribe(DataService.mqttTopicSubscriptions.climate_sjöstorpsvägen_3a),

                client.subscribe(DataService.mqttTopicSubscriptions.image_screensaver),

                client.subscribe(DataService.mqttTopicSubscriptions.transport_departure),
            ])
        } catch (error) {            
            console.error(error);
        }  
    }
    private onMqttMessage(topic: string, message: Buffer, packet: {}): void {
         try {
            const stringMessage = message.toString();
            const jSONMessage = JSON.parse(stringMessage);
            this.distributeMessageToStorage(topic, jSONMessage);
        } catch (error) {
            console.error(error);
        }
    }
    private onMqttError(error: string): void {
            console.error(error); 
    }

    public distributeMessageToStorage(topic: string, jSONMessage: any): void {
        try {
            switch (topic) {
                case DataService.mqttTopicSubscriptions.climate_grovkök_golv:
                    const indoorGrovkokData: IIndoorClimate = jSONMessage as IIndoorClimate;
                    this.updateCurrentGrovkokData(indoorGrovkokData);
                    break;
                case DataService.mqttTopicSubscriptions.climate_huvudtermostat:
                    const indoorHuvudtermostatData: IIndoorClimate = jSONMessage as IIndoorClimate;
                    this.updateCurrentHuvudtermostatData(indoorHuvudtermostatData);
                    break;
                case DataService.mqttTopicSubscriptions.climate_uterum:
                    const indoorUterumData: IIndoorClimate = jSONMessage as IIndoorClimate;
                    this.updateCurrentUterumData(indoorUterumData);
                    break;
                case DataService.mqttTopicSubscriptions.climate_sjöstorpsvägen_3a:
                    const outdoorSjostorpsvagenData: IOutdoorClimate = jSONMessage as IOutdoorClimate;
                    this.updateCurrentOutdoorData(outdoorSjostorpsvagenData);
                    break;
                case DataService.mqttTopicSubscriptions.image_screensaver:
                    const screensaverImage: IImage = jSONMessage as IImage;
                    this.updateCurrentScreensaverImage(screensaverImage);
                    break;
                case DataService.mqttTopicSubscriptions.transport_departure:
                    const lines = jSONMessage.lines;
                    const aTD = new AllTransportData(lines);
                    this.updateCurrentTransportData(aTD);
                    break;
                default:
            }

        } catch (error) {
            console.error(error);
        }
    }
    
}
</script>
