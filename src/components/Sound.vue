<template>
    <div></div>   
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { namespace } from 'vuex-class';

import ISound from '@/interfaces/iSound';

const SoundData = namespace('SoundData');

@Component
export default class Sound extends Vue {
        
     /** Sound */
    @SoundData.Getter
    private currentSound!: ISound;
    @SoundData.State
    private shouldPlaySound!: boolean;
    @SoundData.Action
    private updateShouldPlaySound!: (shouldPlay: boolean) => void;
    @SoundData.Action
    private updateSound!: (sound: ISound) => void;


    @Watch('shouldPlaySound')
    public onShouldPlaySoundChanged(val: boolean, oldVal: boolean) {

        if(this.shouldPlaySound){
            this.playSound(this.currentSound);
        }
        this.updateShouldPlaySound(false);
    }

    private playSound(sound: ISound) {
        const audio = new Audio(sound.src);
        audio.volume = sound.volume;
        audio.play();
    }

}
</script>

<style scope>
</style>