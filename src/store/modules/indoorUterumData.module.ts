import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import IIndoorClimate from '@/interfaces/iIndoorClimate';

@Module({ namespaced: true })
export default class IndoorUterumData extends VuexModule {
    public currentUterumDataJSON = '';

    @Mutation
    public setCurrentUterumData(transportDataJSON: string): void {
        this.currentUterumDataJSON = transportDataJSON;
    }

    @Action
    public updateCurrentUterumData(indoorData: IIndoorClimate): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        const indoorDataJSON = JSON.stringify(indoorData);
        this.context.commit('setCurrentUterumData', indoorDataJSON);
    }

    public get currentUterumData(): IIndoorClimate | null {
        if (this.currentUterumDataJSON) {
            const currentUterumData = JSON.parse(this.currentUterumDataJSON);
            return currentUterumData;
        }
        return null;
    }
}