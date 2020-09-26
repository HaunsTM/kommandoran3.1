import DataService from '@/api/dataService';
import AllTransportData from '@/helpers/allTransportData';
import mqtt from 'mqtt';
import { namespace } from 'vuex-class';

const ScreenSaver = namespace('ScreenSaver');

/* https://css-tricks.com/getting-started-with-vue-plugins/ */

export default class MqttParserHomeassistant {
    private _topic!: string;
    private _message: any = {};

    public constructor(topic: string, message: Buffer) {
        this._topic = topic;
        const stringMessage = message.toString();
        this._message = JSON.parse(stringMessage);
    }

    public distributeMessageToStorage(): void {
        switch (this._topic) {
            case DataService.mqttTopicSubscriptions.transport_departureTime:
                const lines = this._message.lines;
                const aTD = new AllTransportData(lines);
            default:
        }
    }

}