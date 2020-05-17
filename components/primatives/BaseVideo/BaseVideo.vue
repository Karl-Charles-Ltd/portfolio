<template>
  <video
    :width="width"
    :height="height"
    :controls="hasControls"
    :aria-controls="hasControls"
    :muted="muted"
    :aria-muted="muted"
    :autoplay="autoplay"
    :aria-autoplay="autoplay"
    :loop="loop"
    :aria-loop="loop"
  >
    <source v-if="videoSrcMP4" :src="videoSrcMP4" type="video/mp4" />
    <source v-if="videoSrcOGG" :src="videoSrcOGG" type="video/ogg" />
    <template v-if="!videoSrcOGG && !videoSrcMP4">
      Your browser does not support the video tag.
    </template>
  </video>
</template>

<script lang="ts">
import { mixins, Component, Prop } from 'nuxt-property-decorator';
import VideoMixin from '~/components/containers/video/VideoMixin.vue';

@Component
export default class BaseVideo extends mixins(VideoMixin) {
  @Prop({ default: '100%' }) private readonly width!: string;
  @Prop({ default: '100%' }) private readonly height!: string;
  @Prop({ default: '/video/static.mp4' }) private readonly src!: string;

  get videoSrcMP4() {
    return `${this.stripFormat(this.src)}.mp4`;
  }

  get videoSrcOGG() {
    return `${this.stripFormat(this.src)}.ogg`;
  }

  stripFormat(src: string): string {
    return src.split('.', 1)[0];
  }
}
</script>
