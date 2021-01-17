<template>
    <div class="heart">
        <v-icon 
            :color="heartColor" large>{{ svgPath }}</v-icon>
    </div>            
</template>

<script lang="ts">
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import { namespace } from 'vuex-class';
import { mdiHeart } from '@mdi/js';

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
const MQTTData = namespace('MQTTData');

@Component
export default class StatusIndicator extends Vue {
    readonly HEART_BEAT_ANIMATION_CYCLE_MS = 200;
    readonly TIME_BEFORE_CONSIDERED_DEAD_MS = 1000 * 8;

    timeoutAliveCheckTimerID = -1;
    timeoutHeartAnimationTimerID = -1;
    storedMQTTReceived!: Date;

    isDead = false;
    
    heartToggleColor = false;

    heartColor = "";

    lastMQTTReceived!: Date;


    /** hooks */
    private created(): void {
        this.resetAliveCheckTimer();
        this.resetHeartAnimationTimer();
        this.heartColor = "grey";
    }

    /** MQTTData */
    @MQTTData.Getter
    private currentMQTTReceived!: Date | null;    

    @Watch('currentMQTTReceived')
    private onCurrentMQTTReceived(lastMQTTReceived: Date, previousMQTTReceived: Date) {
        if(lastMQTTReceived){
            this.storedMQTTReceived = lastMQTTReceived;
            
            this.isDead = false;
            this.resetAliveCheckTimer();
            this.resetHeartAnimationTimer();
        }
    }

    private get svgPath(): string {
        return mdiHeart;
    }

    private updateCurrentHeartColor() {
        if (this.isDead) {
            this.heartColor = "grey";
        } else {
            this.heartColor = this.heartToggleColor ? "red" : "red lighten-4";
        }
    }



    /** alive */

    private setIsDead(): void {
        this.isDead = true;
        this.updateCurrentHeartColor();
    }

    private startAliveCheck(): void {
        this.timeoutAliveCheckTimerID =
            window.setTimeout(this.setIsDead, 10*1000);
    }

    private resetAliveCheckTimer(): void {
        window.clearTimeout(this.timeoutAliveCheckTimerID);
        this.isDead = false;
        this.startAliveCheck();
    }

    private animateHeartBeat(): void {
        this.heartToggleColor = !this.heartToggleColor;
        this.updateCurrentHeartColor();
    }

    private heartAnimate(): void {
        this.animateHeartBeat();
        this.timeoutHeartAnimationTimerID =
            window.setTimeout(this.resetHeartAnimationTimer, 400);
    }
    private resetHeartAnimationTimer(): void {
        window.clearTimeout(this.timeoutHeartAnimationTimerID);
        this.heartAnimate();
    }





    private beforeDestroy(): void {
        if (this.timeoutAliveCheckTimerID) {
            window.clearTimeout(this.timeoutAliveCheckTimerID);
        }
        if (this.timeoutHeartAnimationTimerID) {
            window.clearTimeout(this.timeoutHeartAnimationTimerID);
        }
    }

}
</script>

<style scope>
    .heart {
        height: 100%;
    }
    .heart-icon {
        border: 1px solid black;
        color: red;
    }    

</style>