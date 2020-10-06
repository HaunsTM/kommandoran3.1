import Vue from 'vue/types/umd';

<template>

    <v-card
      class="card"
    >
        <div class="image-container">
            <img :src="imgSrc()" alt="">
        </div>
    
        <v-card-subtitle class="pb-0">
        
        </v-card-subtitle>
    
        <v-card-text class="text--light">
            <div> Distribution time: {{distributionTime()}}</div>
            <div> Original file name: {{originalFileName()}}</div>
        </v-card-text>
    
        <v-card-actions>    
            <v-btn
                color="orange"
                text
            >
                Stäng
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import DataService from '@/api/dataService';

import { namespace } from 'vuex-class';
import IImage from '@/interfaces/iImage';
import moment from "moment";
import 'moment/locale/sv';
const ScreenSaverData = namespace('ScreenSaver');
@Component({
    components: {
    },
})
export default class ScreenSaver extends Vue {
   private momentLocalized(timestamp: number): moment.Moment {
        const momentLocalized = moment(timestamp, 'X').locale("sv");
        return momentLocalized;
    }
    
    /** Screensaver */
    @ScreenSaverData.Getter
    private currentScreensaverImage!: IImage;    
    
    private imgSrc(): string | null {
        if (this.currentScreensaverImage) {
            const src = `${DataService.baseURL}:8123/local/screensaver_image.jpg?${this.currentScreensaverImage.distributionTimeUTC}`;
            //const src = `data:image/jpeg;base64,${this.currentScreensaverImage.base64Image}`;
            return src;
        }
        debugger;
        return null;
    }
    
    private originalFileName(): string | null {
        if (this.currentScreensaverImage) {
            const originalFileName = this.currentScreensaverImage.originalFileName;
            return originalFileName;
        }
        return null;
    }
    
    private distributionTime(): string | null {
        if (this.currentScreensaverImage) {
            const distributionTime = this.momentLocalized(this.currentScreensaverImage.distributionTimeUTC).toDate().toString();
            return distributionTime;
        }
        return null;
    }
}
</script>
<style scoped>

    .card 
        {
        position: fixed;
        top:0;
        left: 0;
        /*max-height: calc(100vh -172px);*/
    }

    .image-container {
        display: flex;
        justify-content: center;
        width: 100vw;
    }
    img {

        height: calc(100vh - 160px);
    }


    
</style>
