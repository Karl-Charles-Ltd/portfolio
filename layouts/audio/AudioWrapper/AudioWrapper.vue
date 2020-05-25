<template>
  <div id="audio-wrapper">
    <BaseIcon icon="Equalizer" size="base" />
    <client-only>
      <template v-if="selectedTrack">
        <audio
          id="audio-wrapper--trigger"
          ref="audio-wrapper--trigger"
          :src="selectedTrack.track.src"
          :onended="onEnded"
        />
      </template>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator';
import AudioMixin from '~/layouts/audio/AudioMixin.vue';

@Component
export default class AudioWrapper extends mixins(AudioMixin) {
  @Watch('selectedTrack', { deep: true })
  onTrackChange() {
    let audio;

    setTimeout(() => {
      new Promise((resolve) => {
        audio = this.$refs['audio-wrapper--trigger'];
        resolve();
      })
        .then(() => audio.play())
        .catch((error) => {
          throw new Error(error);
        });
    }, 1000);
  }
}
</script>

<style lang="scss">
#audio-wrapper {
  @extend %fixed;
  @extend %flex--end;
  padding: 1rem;
  z-index: z-index(background);
}
</style>
