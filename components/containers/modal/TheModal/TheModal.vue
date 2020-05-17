<template>
  <BaseModal :is-open="isOpen" @closeModal="toggleModal">
    <template slot="content">
      <slot />
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import ModalMixin from '~/components/containers/modal/ModalMixin.vue';
import { addKeyupEventListener, removeKeyupEventListener } from '~/helpers/keyboard';

@Component
export default class TheModal extends mixins(ModalMixin) {
  mounted() {
    addKeyupEventListener(27, this.toggleModal);
  }

  destroyed() {
    removeKeyupEventListener(27, this.toggleModal);
  }

  toggleModal() {
    this.$emit('closeModal');
  }
}
</script>
