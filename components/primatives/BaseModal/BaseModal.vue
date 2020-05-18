<template>
  <transition name="u-fade-in">
    <div v-if="isOpen" class="v-modal">
      <ButtonIcon
        icon="Cross"
        theme="secondary"
        size="base"
        native-type="button"
        class="v-modal__close-button"
        @click.native="toggleModal"
      />
      <slot name="content" />
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import ButtonIcon from '~/components/partials/icons/ButtonIcon/ButtonIcon.vue';

@Component({
  components: {
    ButtonIcon,
  },
})
export default class BaseModal extends Vue {
  @Prop({ default: false }) readonly isOpen!: boolean;

  toggleModal() {
    this.$emit('closeModal');
  }
}
</script>

<style lang="scss">
@import '~sass-mq';

.v-modal {
  background-color: color('white');
  bottom: $spacing-small;
  left: $spacing-small;
  position: fixed;
  right: $spacing-small;
  top: $spacing-small;
  z-index: z-index('modal');

  @include mq($from: tablet) {
    bottom: $spacing-large;
    left: $spacing-intermediate;
    right: $spacing-intermediate;
    top: $spacing-large;
  }

  @include mq($from: smallDesk) {
    left: $spacing-massive;
    right: $spacing-massive;
  }

  @include mq($from: largeDesk) {
    left: 50%;
    transform: translateX(-50%);
    width: rem-value(1200);
  }

  &__close-button {
    position: absolute;
    right: $spacing-tiny;
    top: $spacing-tiny;

    @include mq($from: tablet) {
      right: $spacing-base;
      top: $spacing-base;
    }
  }
}
</style>
