<template>
  <VideoContainer :has-modal="hasModal" :is-disabled="isDisabled" :aria-disabled="isDisabled">
    <!-- BaseVideo defaults to the static video -->
    <BaseVideo :has-modal="false" />
  </VideoContainer>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator';
import ModalMixin from '~/components/containers/modal/ModalMixin.vue';

const VideoContainer = () => import('~/components/containers/video/VideoContainer/VideoContainer.vue');

@Component({
  components: {
    VideoContainer,
  },
})
export default class StaticVideo extends mixins(ModalMixin) {
  @Prop({ default: false }) public readonly isDisabled!: Boolean;
  @Prop({ default: true }) private readonly hasModal!: Boolean;
}
</script>
