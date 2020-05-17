<template>
  <component :is="iconComponent" class="v-icon" :class="iconClasses" v-bind="$attrs" />
</template>

<script lang="ts">
import { Prop, Component, mixins } from 'nuxt-property-decorator';
import iconMixin from '../iconMixin.vue';
import * as icons from '../icons';

const availableSizes: string[] = ['mini', 'teeny', 'tiny', 'small', 'base', 'medium', 'intermediate', 'big'];

@Component({
  components: { ...icons },
})
export default class BaseIcon extends mixins(iconMixin) {
  @Prop({ required: true, validator: (value) => Object.keys(icons).includes(value) }) readonly icon!: string;
  @Prop({ default: 'teeny', validator: (value) => availableSizes.includes(value) })
  readonly size!: string;

  get iconClasses() {
    return {
      [`v-icon--${this.direction}`]: this.direction && this.icon === 'ArrowCenter',
      [`v-icon--${this.size}`]: this.size,
      [`u-color-${this.theme}`]: this.theme,
    };
  }

  get iconComponent() {
    if (icons[this.icon]) {
      return icons[this.icon];
    } else {
      throw new Error(`${this.icon} does not exist.`);
    }
  }
}
</script>

<style lang="scss">
@import '../setup.scss';

.v-icon {
  fill: currentColor;
  vertical-align: top;

  &--left {
    transform: rotate(90deg);
  }

  &--right {
    transform: rotate(270deg);
  }

  &--up {
    transform: rotate(180deg);
  }

  @each $_size-name, $_size-value in $icon-size-map {
    &.v-icon--#{$_size-name} {
      height: #{$_size-value};
      width: #{$_size-value};
    }
  }
}
</style>
