<template>
    <div>
        <service-mqtt-home-assistant />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ServiceMqttHomeAssistant from './ServiceMqttHomeAssistant.vue';
@Component({
    components: {
        ServiceMqttHomeAssistant
    },
})
export default class Services extends Vue {
    
}
</script>
