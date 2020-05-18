<template>
  <div class="v-toggle-btn">
    <label v-if="$slots.default" class="v-toggle-btn__label" :for="id">
      <slot />
    </label>
    <button
      :id="id"
      :aria-checked="on"
      class="v-toggle-btn__pill"
      role="switch"
      v-bind="$attrs"
      @click="toggle"
    >
      <span class="v-toggle-btn__toggle" :class="{ 'v-toggle-btn__toggle--active': on }" />
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({
  inheritAttrs: false,
})
export default class BaseToggleButton extends Vue {
  @Prop({ required: true }) readonly id!: string;

  on: boolean = false;

  toggle() {
    this.on = !this.on;
    this.$emit('toggled', this.on);
  }
}
</script>

<style lang="scss">
.v-toggle-btn {
  &__pill {
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    appearance: none !important;
    background-color: color('light-grey-one');
    border: none;
    box-sizing: border-box;
    height: $spacing-tiny;
    margin: 0 $spacing-mini;
    outline: none;
    position: relative;
    width: $spacing-small;

    &:before {
      left: -50%;
    }

    &:after {
      right: -50%;
    }
  }

  .v-toggle-btn__pill:before,
  .v-toggle-btn__pill:after {
    background-color: color('light-grey-one');
    content: '';
    height: $spacing-tiny;
    width: $spacing-tiny;
  }

  .v-toggle-btn__pill:before,
  .v-toggle-btn__pill:after,
  .v-toggle-btn__toggle {
    border-radius: 50%;
    position: absolute;
    right: -50%;
    top: 50%;
    transform: translateY(-50%);
  }

  &__toggle {
    background-color: color('white');
    border: solid 1px color('light-grey-one');
    height: $spacing-small;
    left: -#{rem-value(10)};
    transition: all 0.1s ease-in-out;
    width: $spacing-small;
    z-index: z-index('componentsForeground');

    &--active {
      background-color: color('secondary');
      border: solid 1px color('secondary');
      left: rem-value(8);
    }
  }
}
</style>
