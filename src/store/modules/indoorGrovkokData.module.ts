import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import IIndoorClimate from '@/interfaces/iIndoorClimate';

@Module({ namespaced: true })
export default class IndoorGrovkokData extends VuexModule {
    public currentGrovkokDataJSON = '';

    @Mutation
    public setCurrentGrovkokData(transportDataJSON: string): void {
        this.currentGrovkokDataJSON = transportDataJSON;
    }

    @Action
    public updateCurrentGrovkokData(indoorData: IIndoorClimate): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        const indoorDataJSON = JSON.stringify(indoorData);
        this.context.commit('setCurrentGrovkokData', indoorDataJSON);
    }

    public get currentGrovkokData(): IIndoorClimate | null {
        if (this.currentGrovkokDataJSON) {
            const currentGrovkokData = JSON.parse(this.currentGrovkokDataJSON);
            return currentGrovkokData;
        }
        return null;
    }
}
