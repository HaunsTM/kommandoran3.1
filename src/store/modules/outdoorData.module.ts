import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import IOutdoorClimate from '@/interfaces/iOutdoorClimate';

@Module({ namespaced: true })
export default class OutdoorData extends VuexModule {
    public currentOutdoorDataJSON = '';

    @Mutation
    public setCurrentOutdoorData(transportDataJSON: string): void {
        this.currentOutdoorDataJSON = transportDataJSON;
    }

    @Action
    public updateCurrentOutdoorData(outdoorData: IOutdoorClimate): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        const outdoorDataJSON = JSON.stringify(outdoorData);
        this.context.commit('setCurrentOutdoorData', outdoorDataJSON);
    }

    public get currentOutdoorData(): IOutdoorClimate | null {
        if (this.currentOutdoorDataJSON) {
            const currentOutdoorData = JSON.parse(this.currentOutdoorDataJSON);
            return currentOutdoorData;
        }
        return null;
    }
}
