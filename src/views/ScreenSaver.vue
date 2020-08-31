import Vue from 'vue/types/umd';

<template>

    <div>
        <v-app-bar app>
        <!--  -->
            <v-toolbar-title>Kommandoran</v-toolbar-title>
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>

            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <div class="container">
                    <img :src="imgSrc()" />
                    {{imgSrc()}}
                </div>
            </v-container>
        </v-main>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

@Component({
    components: {
    },
    computed: {
        ...mapGetters({

        }),
    },
})
export default class ScreenSaver extends Vue {
    private nonsenseNoCacheKey = -1;

    private apiBaseUrl(): string {
        const apiBaseUrl = this.$store.getters.getApiBaseUrl;
        return apiBaseUrl;

    }
    private imgSrc(): string {
        const src = `${this.apiBaseUrl()}/local/screensaver_image.jpg?${this.nonsenseNoCacheKey}`;
        return src;
    }
    private updateNonsenseNoCacheKey(): void {
        this.nonsenseNoCacheKey = new Date().getTime();
    }
}
</script>
<style scoped>

    img, div {
        padding: 0;
        margin: 0;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media (max-width: 400px) {
        .container {
            width: 100%;
            height: calc(95vh - 60px - 40px);
        }
        img {
            max-width: 100%;
            height: auto;
            width: auto;
            max-height: calc(95vh - 60px - 40px);
        }
    }

   @media (min-width: 401px) {
        .container {
            width: 100%;
            height: calc(93vh - 60px - 40px);
        }
        img {
            max-width: 100%;
            height: auto;
            width: auto;
            max-height: calc(93vh - 60px - 40px);
        }

    }
</style>
