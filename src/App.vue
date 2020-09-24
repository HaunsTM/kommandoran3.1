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
import { Component, Vue } from 'vue-property-decorator';
import DataService from './api/dataService';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import mqttParserHomeassistant from './helpers/mqttParserHomeassistant'

import mqtt, { MqttClient } from 'mqtt'
import KommandoranFooter from '@/components/KommandoranFooter.vue';

import { OnIdle, OnActive } from 'vue-plugin-helper-decorator';

@Component({
    components: {
      KommandoranFooter
    },
})
export default class App extends Vue {

    private enterScreenSaverMode(): boolean {
         return this.$store.getters.enterScreenSaverMode;
    }
    private navigateTo(routeName: string): void {
        this.$router.push({ name: routeName })
        
    }
    
    @OnIdle()
    public whenIdle() {
            this.navigateTo('ScreenSaver');
    }
    
    @OnActive()
    public whenActive() {
            this.navigateTo('HomeAssistant');
    }
    private created(): void {
        this.startMqttService();
        console.log('propertyComputed will update, as this.property is now reactive.')
    }

    public startMqttService(): void {
        const client = 
            mqtt.connect(
                DataService.mqttHomeassistantConstructorParameters.brokerUrl,
                DataService.mqttHomeassistantConstructorParameters.options);
        
        client.on("connect",async ()=>{this.onConnected(client);});
        client.on("message",this.onMessage);   
    }
    private async onConnected(client: mqtt.Client): Promise<void> {
        console.log('connected');
        
        await client.subscribe(DataService.mqttTopicSubscriptions.transport_departureTime);
    }
    private onMessage(topic: string, message: Buffer, packet: {}): void {
        const parser = new mqttParserHomeassistant(topic, message);
        parser.distributeMessageToStorage()
    }
    private onError(error: string): void {
        console.log(`Error: ${error}`);        
    }
}
</script>

