import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import IIndoorClimate from '@/interfaces/iIndoorClimate';

@Module({ namespaced: true })
export default class IndoorHuvudtermostatData extends VuexModule {
    public currentHuvudtermostatDataJSON = '';

    @Mutation
    public setCurrentHuvudtermostatData(transportDataJSON: string): void {
        this.currentHuvudtermostatDataJSON = transportDataJSON;
    }

    @Action
    public updateCurrentHuvudtermostatData(indoorData: IIndoorClimate): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        const indoorDataJSON = JSON.stringify(indoorData);
        this.context.commit('setCurrentHuvudtermostatData', indoorDataJSON);
    }

    public get currentHuvudtermostatData(): IIndoorClimate | null {
        if (this.currentHuvudtermostatDataJSON) {
            const currentHuvudtermostatData = JSON.parse(this.currentHuvudtermostatDataJSON);
            return currentHuvudtermostatData;
        }
        return null;
    }
}