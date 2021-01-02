import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import ISound from '@/interfaces/iSound';

@Module({ namespaced: true })
export default class SoundData extends VuexModule {
    public shouldPlaySound = false;
    public soundJSON = '';

    @Mutation
    public setShouldPlaySound(displayed: boolean): void {
        this.shouldPlaySound = displayed;
    }

    @Mutation
    public setSound(soundJSON: string): void {
        this.soundJSON = soundJSON;
    }

    @Action
    public updateShouldPlaySound(shouldPlay: boolean): void {
        /*An action contains business logic and it does not care about updating the state directly.*/
        this.context.commit('setShouldPlaySound', shouldPlay);
    }

    @Action
    public updateSound(sound: ISound): void {
        const soundJSON = JSON.stringify(sound);
        this.context.commit('setSound', soundJSON);
    }

    public get currentSound(): ISound | null {
        
        if (this.soundJSON) {
            const sound = JSON.parse(this.soundJSON);
            return sound;
        }
        return null;
    }
}
