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

    private mqttClient!: mqtt.MqttClient;

    private get dataService(): DataService {
        return DataService;
    }

    /** mqtt */
    public startMqttService(): void {
        try {
            const brokerUrl = DataService.mqttHomeassistantConstructorParameters.brokerUrl;
            const options = DataService.mqttHomeassistantConstructorParameters.options;

            this.mqttClient = 
                mqtt.connect(
                    brokerUrl,
                    options);
            this.mqttClient.on("connect", this.onMqttConnected);
            this.mqttClient.on("message", this.onMqttMessage);
            this.mqttClient.on("error", this.onMqttError);
            this.mqttClient.on("offline", this.onMqttOffline);
        } catch (error) {
            console.error(error);
        }  
    }

    private onMqttConnected(): void {
        try {
            this.mqttClient.subscribe(DataService.mqttTopicSubscriptions.climate_utilityRoomFloor);
            this.mqttClient.subscribe(DataService.mqttTopicSubscriptions.climate_mainThermostat);
            this.mqttClient.subscribe(DataService.mqttTopicSubscriptions.climate_outdoorRoom);
            this.mqttClient.subscribe(DataService.mqttTopicSubscriptions.climate_sjöstorpsvägen_3a);

            this.mqttClient.subscribe(DataService.mqttTopicSubscriptions.image_screensaver);

            this.mqttClient.subscribe(DataService.mqttTopicSubscriptions.sound_play_file);

            this.mqttClient.subscribe(DataService.mqttTopicSubscriptions.transport_departure);
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

    
    private onMqttOffline(error: string): void {
        //https://stackoverflow.com/questions/37312983/node-js-mqtt-client-doesnt-received-subscribed-messages-when-broker-goes-down-a
        this.mqttClient.end(true, () => {
            this.startMqttService();
        });
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
