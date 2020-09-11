<template>

    <article class="flex-container">
        <div class="flex-container column">
            <div>
                <img :src="require(`@/assets/wall-clock24x24.png`)" />
            </div>
        </div>
        <div class="flex-container column justify-content-center">
            <div class="flex-container">
                <div>
                    {{currentTime}}
                </div>
            </div>
            <div class="flex-container">
                {{currentDate}}
            </div>
        </div>
    </article>

</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator';

import moment from "moment";
import 'moment/locale/sv';

@Component({
    components: {
    },
})
export default class KommandoranFooterTime extends Vue {
    private currentDate = "";
    private currentTime = "";

    private intervalCalculateTime!: number;
    private intervalCalculateDate!: number;

   private momentLocalized(): moment.Moment {
        const momentLocalized = moment().locale("sv");
        return momentLocalized;
    }
    private calculateDate(): void {
        this.currentDate = this.momentLocalized().format('L');
    }
    private calculateTime(): void {
        this.currentTime = this.momentLocalized().format('LT');
    }
    private mounted(): void {
        this.calculateTime();
        this.calculateDate();

        this.intervalCalculateTime = setInterval(this.calculateTime, 1);
        this.intervalCalculateDate = setInterval(this.calculateDate, 1);
    }
    private beforeDestroy(): void {
        clearInterval(this.intervalCalculateTime);
        clearInterval(this.intervalCalculateDate);
    }
}
</script>

<style scope>
    .flex-container {
        display: flex;
    }
    .column {        
        flex-direction: column;
    }
    .justify-content-center {
        align-items: center;
    }
</style>
