<template>
  <div id="audio-wrapper">
    <BaseIcon icon="Equalizer" size="small" />
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import AudioMixin from '~/layouts/audio/AudioMixin.vue';

@Component
export default class AudioWrapper extends mixins(AudioMixin) {}
</script>

<style lang="scss">
#audio-wrapper {
  @extend %fixed;
  @extend %flex--end;
  padding: 1rem;
}
</style>
