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
import IImage from '@/interfaces/iImage';
import IIndoorClimate from '@/interfaces/iIndoorClimate';
import IOutdoorClimate from '@/interfaces/iOutdoorClimate';
import ISound from '@/interfaces/iSound';

import DataService from '@/api/dataService';

const IndoorUtilityRoomData = namespace('IndoorUtilityRoomData');
const IndoorMainThermostatData = namespace('IndoorMainThermostatData');
const IndoorOutdoorRoomData = namespace('IndoorOutdoorRoomData');
const OutdoorData = namespace('OutdoorData');

const TransportData = namespace('TransportData');
const ScreenSaverData = namespace('ScreenSaverData');
const SoundData = namespace('SoundData');

@Component
export default class ServiceMqttHomeAssistant extends Vue {
    
    /** Climate */
    @IndoorUtilityRoomData.Getter
    private currentUtilityRoomData!: IIndoorClimate;
    @IndoorUtilityRoomData.Action
    private updateCurrentUtilityRoomData!: (indoorUtilityRoomData: IIndoorClimate) => void;

    @IndoorMainThermostatData.Getter
    private currentMainThermostatData!: IIndoorClimate;
    @IndoorMainThermostatData.Action
    private updateCurrentMainThermostatData!: (indoorMainThermostatData: IIndoorClimate) => void;

    @IndoorOutdoorRoomData.Getter
    private currentOutdoorRoomData!: IIndoorClimate;
    @IndoorOutdoorRoomData.Action
    private updateCurrentOutdoorRoomData!: (indoorOutdoorRoomData: IIndoorClimate) => void;

    @OutdoorData.Getter
    private currentOutdoorData!: IOutdoorClimate;
    @OutdoorData.Action
    private updateCurrentOutdoorData!: (outdoorData: IOutdoorClimate) => void;

    /** Image */
    @ScreenSaverData.Getter
    private currentScreensaverBase64ImageData!: string;
    @ScreenSaverData.Action
    private updateCurrentScreensaverImage!: (screensaverImage: IImage) => void;

    /** Sound */
    @SoundData.Getter
    private currentSound!: ISound;
    @SoundData.State
    private shouldPlaySound!: boolean;
    @SoundData.Action
    private updateShouldPlaySound!: (shouldPlay: boolean) => void;
    @SoundData.Action
    private updateSound!: (sound: ISound) => void;

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
                client.subscribe(DataService.mqttTopicSubscriptions.climate_utilityRoomFloor),
                client.subscribe(DataService.mqttTopicSubscriptions.climate_mainThermostat),
                client.subscribe(DataService.mqttTopicSubscriptions.climate_outdoorRoom),
                client.subscribe(DataService.mqttTopicSubscriptions.climate_sjöstorpsvägen_3a),

                client.subscribe(DataService.mqttTopicSubscriptions.image_screensaver),

                client.subscribe(DataService.mqttTopicSubscriptions.sound_play_file),

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
                case DataService.mqttTopicSubscriptions.climate_utilityRoomFloor:
                    const indoorUtilityRoomData: IIndoorClimate = jSONMessage as IIndoorClimate;
                    this.updateCurrentUtilityRoomData(indoorUtilityRoomData);
                    break;
                case DataService.mqttTopicSubscriptions.climate_mainThermostat:
                    const indoorMainThermostatData: IIndoorClimate = jSONMessage as IIndoorClimate;
                    this.updateCurrentMainThermostatData(indoorMainThermostatData);
                    break;
                case DataService.mqttTopicSubscriptions.climate_outdoorRoom:
                    const indoorOutdoorRoomData: IIndoorClimate = jSONMessage as IIndoorClimate;
                    debugger;
                    this.updateCurrentOutdoorRoomData(indoorOutdoorRoomData);
                    break;
                case DataService.mqttTopicSubscriptions.climate_sjöstorpsvägen_3a:
                    const outdoorSjostorpsvagenData: IOutdoorClimate = jSONMessage as IOutdoorClimate;
                    this.updateCurrentOutdoorData(outdoorSjostorpsvagenData);
                    break;
                case DataService.mqttTopicSubscriptions.image_screensaver:
                    const screensaverImage: IImage = jSONMessage as IImage;
                    this.updateCurrentScreensaverImage(screensaverImage);
                    break;
                case DataService.mqttTopicSubscriptions.sound_play_file:
                    const sound = jSONMessage as ISound;
                    this.updateSound(sound);                    
                    this.updateShouldPlaySound(true);
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
