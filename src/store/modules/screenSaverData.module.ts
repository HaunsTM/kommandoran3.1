import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import IImage from '@/interfaces/iImage';

@Module({ namespaced: true })
export default class ScreenSaverData extends VuexModule {
    public shouldEnterScreenSaverMode = false;
    public currentScreensaverImageJSON = '';

    @Mutation
    public setDisplayScreensaver(displayed: boolean): void {
        this.shouldEnterScreenSaverMode = displayed;
    }

    @Mutation
    public setCurrentScreensaverImage(screensaverImageJSON: string): void {
        this.currentScreensaverImageJSON = screensaverImageJSON;
    }

    @Action
    public updateDisplayStatus(displayed: boolean): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        this.context.commit('setDisplayScreensaver', displayed);
    }

    @Action
    public updateCurrentScreensaverImage(screensaverImage: IImage): void {
        const screensaverImageJSON = JSON.stringify(screensaverImage);
        this.context.commit('setCurrentScreensaverImage', screensaverImageJSON);
    }

    public get currentScreensaverImage(): IImage | null {
        
        if (this.currentScreensaverImageJSON) {
            const currentScreensaverImage = JSON.parse(this.currentScreensaverImageJSON);
            return currentScreensaverImage;
        }
        return null;
    }
}
