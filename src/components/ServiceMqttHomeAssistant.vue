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

import DataService from '@/api/dataService';

const TransportData = namespace('TransportData');


@Component
export default class ServiceMqttHomeAssistant extends Vue {
    
    /** Screensaver */
    @TransportData.State
    private currentTransportData!: IAllTransportData;
    @TransportData.Action
    private updateCurrentTransportData!: (transportData: IAllTransportData) => void;
    /** hooks */
    private created(): void {
        this.startMqttService();
        console.log('propertyComputed will update, as this.property is now reactive.')
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
            await client.subscribe(DataService.mqttTopicSubscriptions.transport_departureTime);
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
                case DataService.mqttTopicSubscriptions.transport_departureTime:
                    const lines = jSONMessage.lines;
                    const aTD = new AllTransportData(lines);
                    this.updateCurrentTransportData(aTD);
                default:
            }

        } catch (error) {
            console.error(error);
        }
    }
    
}
</script>
