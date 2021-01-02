import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import IIndoorClimate from '@/interfaces/iIndoorClimate';

@Module({ namespaced: true })
export default class IndoorOutdoorRoomData extends VuexModule {
    public currentOutdoorRoomDataJSON = '';

    @Mutation
    public setCurrentOutdoorRoomData(transportDataJSON: string): void {
        this.currentOutdoorRoomDataJSON = transportDataJSON;
    }

    @Action
    public updateCurrentOutdoorRoomData(indoorData: IIndoorClimate): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        const indoorDataJSON = JSON.stringify(indoorData);
        this.context.commit('setCurrentOutdoorRoomData', indoorDataJSON);
    }

    public get currentOutdoorRoomData(): IIndoorClimate | null {
        if (this.currentOutdoorRoomDataJSON) {
            const currentOutdoorRoomData = JSON.parse(this.currentOutdoorRoomDataJSON);
            return currentOutdoorRoomData;
        }
        return null;
    }
}