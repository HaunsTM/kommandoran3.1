import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import IIndoorClimate from '@/interfaces/iIndoorClimate';

@Module({ namespaced: true })
export default class IndoorMainThermostatData extends VuexModule {
    public currentMainThermostatDataJSON = '';

    @Mutation
    public setCurrentMainThermostatData(transportDataJSON: string): void {
        this.currentMainThermostatDataJSON = transportDataJSON;
    }

    @Action
    public updateCurrentMainThermostatData(indoorData: IIndoorClimate): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        const indoorDataJSON = JSON.stringify(indoorData);
        this.context.commit('setCurrentMainThermostatData', indoorDataJSON);
    }

    public get currentMainThermostatData(): IIndoorClimate | null {
        if (this.currentMainThermostatDataJSON) {
            const currentMainThermostatData = JSON.parse(this.currentMainThermostatDataJSON);
            return currentMainThermostatData;
        }
        return null;
    }
}