import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import IAllTransportData from '@/interfaces/iAllTransportData';

@Module({ namespaced: true })
export default class TransportData extends VuexModule {
    public currentTransportDataJSON = '';

    @Mutation
    public setCurrentTransportData(transportDataJSON: string): void {
        this.currentTransportDataJSON = transportDataJSON;
    }

    @Action
    public updateCurrentTransportData(transportData: IAllTransportData): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        const transportDataJSON = JSON.stringify(transportData);
        this.context.commit('setCurrentTransportData', transportDataJSON);
    }
    public get currentTransportData(): IAllTransportData | null {
        if (this.currentTransportDataJSON) {
            const currentTransportData = JSON.parse(this.currentTransportDataJSON);
            return currentTransportData;
        }
        return null;
    }
}
