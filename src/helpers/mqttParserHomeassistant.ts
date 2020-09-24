import DataService from '@/api/ataService';
import mqtt from 'mqtt'

/* https://css-tricks.com/getting-started-with-vue-plugins/ */

export default class mqttParserHomeassistant {
    private _topic!: string;
    private _message!: {};

    public constructor(topic: string, message: Buffer) {
        this._topic = topic;
        const stringMessage = message.toString();
        this._message = JSON.parse(stringMessage);
    }

    public distributeMessageToStorage(): void {
        switch (this._topic) {
            case DataService.mqttTopicSubscriptions.transport_departureTime:
                debugger;
            default:
        }
    }

}