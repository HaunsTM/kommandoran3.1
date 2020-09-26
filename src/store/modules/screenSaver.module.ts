import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class ScreenSaver extends VuexModule {
    public shouldEnterScreenSaverMode = false;

    @Mutation
    public setDisplayScreensaver(displayed: boolean): void {
        this.shouldEnterScreenSaverMode = displayed;
    }

    @Action
    public updateDisplayStatus(displayed: boolean): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        this.context.commit('setDisplayScreensaver', displayed);
    }
}
