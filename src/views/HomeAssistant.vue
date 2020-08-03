<template>
    <div>

      <!-- Sizes your content based upon application components -->
      <v-main>

        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <div class="iframe-container">
              <iframe src="http://10.0.0.6:8123" title="Home Assistant"></iframe>
          </div>
        </v-container>
      </v-main>
    </div>
</template>

<script>
export default {
  name: 'HomeAssistant',

};
</script>

<style scope>
  .iframe-container {
        position: relative;
        overflow: hidden;
        padding-top: calc(100vh - 90px);
        width: 100%;
        border: 1px solid black;

    }
    .iframe-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        min-width: 100vw;
        min-height: 100vh;

    }
</style>
