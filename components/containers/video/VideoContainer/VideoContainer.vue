<template>
  <BaseLayout class="dl-video">
    <BaseLayoutItem r="1/1">
      <slot />
    </BaseLayoutItem>

    <template v-if="hasModal">
      <TheModal>
        <BaseLayout>
          <BaseLayoutItem r="1/1">
            <slot />
          </BaseLayoutItem>
        </BaseLayout>
      </TheModal>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator';
import ModalMixin from '~/components/containers/modal/ModalMixin.vue';

const TheModal = () => import('~/components/containers/modal/TheModal/TheModal.vue');

@Component({
  components: {
    TheModal,
  },
})
export default class VideoContainer extends mixins(ModalMixin) {
  @Prop({ default: false }) public readonly isDisabled!: Boolean;
  @Prop({ default: true }) public readonly hasModal!: Boolean;
}
</script>

<style lang="scss">
.dl-video {
  @extend %flex--center;
  @extend %absolute;
}
</style>
