import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import IIndoorClimate from '@/interfaces/iIndoorClimate';

@Module({ namespaced: true })
export default class IndoorUtilityRoomData extends VuexModule {
    public currentUtilityRoomDataJSON = '';

    @Mutation
    public setCurrentUtilityRoomData(transportDataJSON: string): void {
        this.currentUtilityRoomDataJSON = transportDataJSON;
    }

    @Action
    public updateCurrentUtilityRoomData(indoorData: IIndoorClimate): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        const indoorDataJSON = JSON.stringify(indoorData);
        this.context.commit('setCurrentUtilityRoomData', indoorDataJSON);
    }

    public get currentUtilityRoomData(): IIndoorClimate | null {
        if (this.currentUtilityRoomDataJSON) {
            const currentUtilityRoomData = JSON.parse(this.currentUtilityRoomDataJSON);
            return currentUtilityRoomData;
        }
        return null;
    }
}
