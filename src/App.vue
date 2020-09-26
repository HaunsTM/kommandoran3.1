<template>
  <v-app dark>

    <router-view></router-view>
    <v-footer app>
      <v-col
        class="text-center"
        cols="12"
      >
        <kommandoran-footer />
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import DataService from './api/dataService';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import mqttParserHomeassistant from './helpers/mqttParserHomeassistant'

import mqtt, { MqttClient } from 'mqtt'
import KommandoranFooter from '@/components/KommandoranFooter.vue';

import { OnIdle, OnActive } from 'vue-plugin-helper-decorator';

import { namespace } from 'vuex-class';
const ScreenSaver = namespace('ScreenSaver');

@Component({
    components: {
      KommandoranFooter
    },
})
export default class App extends Vue {
    @ScreenSaver.State
    private shouldEnterScreenSaverMode!: boolean;
    @ScreenSaver.Action
    private updateDisplayStatus!: (displayed: boolean) => void;
    
    @Watch('shouldEnterScreenSaverMode')
    onShouldEnterScreenSaverModeChanged(value: string, oldValue: string) {
        if(this.shouldEnterScreenSaverMode) {
            this.navigateTo('ScreenSaver');
        } else {
            this.navigateTo('HomeAssistant');
        }
    }

    private navigateTo(routeName: string): void {
        this.$router.push({ name: routeName })        
    }
    
    @OnIdle()
    public async whenIdle() {
        const displayed = true;
        this.updateDisplayStatus(displayed);
        //this.navigateTo('ScreenSaver');
    }
    
    @OnActive()
    public async whenActive() {
        const displayed = false;
        this.updateDisplayStatus(displayed);
        //this.navigateTo('HomeAssistant');
    }



    /** hooks */
    private created(): void {
        this.startMqttService();
        console.log('propertyComputed will update, as this.property is now reactive.')
    }


    /** mqtt */
    public startMqttService(): void {
        const client = 
            mqtt.connect(
                DataService.mqttHomeassistantConstructorParameters.brokerUrl,
                DataService.mqttHomeassistantConstructorParameters.options);
        
        client.on("connect",async ()=>{this.onMqttConnected(client);});
        client.on("message",this.onMqttMessage);   
    }
    private async onMqttConnected(client: mqtt.Client): Promise<void> {
        await client.subscribe(DataService.mqttTopicSubscriptions.transport_departureTime);
    }
    private onMqttMessage(topic: string, message: Buffer, packet: {}): void {
        const parser = new mqttParserHomeassistant(topic, message);
        parser.distributeMessageToStorage()
    }
    private onMqttError(error: string): void {
        console.log(`Error: ${error}`);        
    }
}
</script>

