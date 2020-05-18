<template>
  <div :class="outerClasses" class="v-btn-icon">
    <component :is="tag" class="v-btn-icon__btn" tabindex="0" v-bind="$attrs" v-on="buttonListeners">
      <BaseIcon
        class="v-btn-icon__graphic"
        :direction="direction"
        :icon="graphic"
        :size="size"
        :theme="theme"
      />
    </component>
  </div>
</template>

<script lang="ts">
import { Prop, Component, mixins } from 'nuxt-property-decorator';
import iconMixin from '../iconMixin.vue';
import * as icons from '../icons';
import buttonMixin from '~/components/partials/buttons/buttonMixin.vue';

const availableSizes: string[] = ['teeny', 'tiny', 'small', 'base', 'medium', 'intermediate', 'big'];

@Component({
  inheritAttrs: false,
  components: {},
})
export default class ButtonIcon extends mixins(iconMixin, buttonMixin) {
  @Prop({ required: true, validator: (value) => Object.keys(icons).includes(value) }) readonly icon!: string;
  @Prop({ default: 'small', validator: (value) => availableSizes.includes(value) })
  readonly size!: string;

  get graphic() {
    return this.loading && this.disc ? 'LoadingSpinner' : this.icon;
  }

  get outerClasses() {
    return {
      [`v-btn-icon--${this.size}`]: this.size,
      [`v-btn-icon--${this.theme}`]: this.theme,
      'v-btn-icon--focus': this.focus,
      'v-btn-icon--disabled': this.disabled,
      'v-btn-icon--disc': this.disc,
      'v-btn-icon--busy': this.loading,
    };
  }
}
</script>

<style lang="scss">
@import '../setup.scss';

.v-btn-icon {
  border-radius: 50%;
  display: inline-block;
  position: relative;
  transition: box-shadow 0.2s ease-in;
  vertical-align: top;

  &--disabled {
    .v-btn-icon__btn {
      cursor: unset;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &--busy {
    .v-btn-icon__btn {
      cursor: wait;
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    left: 50%;
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: z-index('foreground');
  }

  &__graphic {
    transition: background-color 0.2s ease-in;
  }
}

@each $_size-name, $_size-value in $disc-icon-size-map {
  .v-btn-icon--#{$_size-name} {
    height: calc(#{$_size-value} + 4px);
    width: calc(#{$_size-value} + 4px);
  }
}

@each $_theme-name, $_theme-map in $button-icon-style-map {
  .v-btn-icon--#{$_theme-name}.v-btn-icon--disc {
    .v-btn-icon__btn {
      outline: none;
    }

    @each $_state, $_color in $_theme-map {
      &.v-btn-icon--focus {
        box-shadow: 0 0 2px 2px map-get($_theme-map, 'focus');
      }
      .v-btn-icon__btn:hover .v-btn-icon__graphic:not(.v-btn-icon__btn--disabled) {
        background-color: map-get($_theme-map, 'hover') !important;
      }
    }
  }
}
</style>
