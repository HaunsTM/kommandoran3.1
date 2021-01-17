import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class MQTTData extends VuexModule {
    public lastMQTTReceivedJSON = '';

    @Mutation
    public setMQTTReceivedJSON(lastMQTTReceivedJSON: string): void {
        this.lastMQTTReceivedJSON = lastMQTTReceivedJSON;
    }

    @Action
    public updateMQTTReceived(lastMQTTReceived: Date): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        const lastMQTTReceivedJSON = JSON.stringify(lastMQTTReceived);
        this.context.commit('setMQTTReceivedJSON', lastMQTTReceivedJSON);
    }
    public get currentMQTTReceived(): Date | null {
        if (this.lastMQTTReceivedJSON) {
            const lastMQTTReceivedJSON = JSON.parse(this.lastMQTTReceivedJSON);
            return lastMQTTReceivedJSON;
        }
        return null;
    }
}
