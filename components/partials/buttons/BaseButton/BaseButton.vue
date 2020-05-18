<template>
  <component
    :is="tag"
    :type="nativeType"
    :class="[buttonClasses, additionalButtonClasses]"
    v-bind="$attrs"
    v-on="buttonListeners"
  >
    <span v-if="active && type === 'outline'" class="v-btn__left-content">
      <BaseIcon icon="Tick" :theme="themeMap[theme].foreground" size="base" />
    </span>
    <span v-else-if="$slots['left-content']" class="v-btn__left-content">
      <slot name="left-content" />
    </span>

    <BaseIcon
      v-if="loading"
      icon="LoadingSpinner"
      :theme="loadingSpinnerColor"
      :size="type === 'outline' || type === 'action' ? 'base' : 'small'"
    />

    <span v-else :class="contentClasses" class="v-btn__content">
      <slot />
    </span>
  </component>
</template>

<script lang="ts">
import { Prop, Component, mixins } from 'nuxt-property-decorator';
import buttonMixin from '../buttonMixin.vue';
import { themeMap } from '~/helpers/colors';

const availableTypes: string[] = ['block', 'outline', 'line', 'action'];

/**
 * ### **Features:**
 * - Themes - primary, secondary, tertiary, quaternary, quinary, white, charcoal, light-grey-one
 * - Types  - block, outline, line, action
 * - States - disabled, loading, active
 * - Tag    - button, a, nuxt-link
 *
 * ### **Important attributes:**
 * `aria-label` - Add an aria-label when button content doesn't describe it, such as when icon-only. Read as `"click {label}"`
 * `aria-role` - When not using `<button>` tag, add `aria-role="button"` if the element will do something in response to user input (such as when using an a tag to display a modal, rather than to navigate).
 *
 * ### **Other notes:**
 * Block and outline styles - the width is set to 100% so that the parent can decide the width of the button.
 */
@Component
export default class BaseButton extends mixins(buttonMixin) {
  @Prop({ default: 'block', validator: (value) => availableTypes.includes(value) }) readonly type!: string;
  @Prop({ default: false }) readonly wide!: boolean;
  @Prop({ default: false }) readonly block!: boolean;

  themeMap = themeMap;

  get contentClasses() {
    return {
      'u-margin-left-micro': !!this.$slots['left-content'],
      'u-text--small-body': this.type === 'action',
      'u-text--button': this.type !== 'action',
    };
  }

  get additionalButtonClasses() {
    return {
      [`v-btn--${this.type}`]: this.type,
      'v-btn--has-left-content': !!this.$slots['left-content'],
      'v-btn--wide': this.wide,
      'v-btn--display-block': this.block,
    };
  }

  get loadingSpinnerColor(): string | null {
    if (this.type === 'outline' || this.type === 'line') return this.theme;
    if (this.type === 'action') return 'secondary';

    return themeMap[this.theme] ? themeMap[this.theme].foreground : null;
  }
}
</script>

<style lang="scss">
@import '../themes.scss';

.v-btn {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  background: none;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  padding: 0;
  position: relative;
}

.v-btn--outline,
.v-btn--action {
  .v-btn__content,
  .v-btn__left-content {
    display: block;
    position: relative;
    z-index: z-index('foreground');
  }
}

.v-btn--block {
  padding: $spacing-tiny $spacing-teeny;
  position: relative;
  text-align: center;
  transition-duration: 0.3s;
  transition-property: transform;
  transition-timing-function: ease-in-out;

  @include mq($until: tablet) {
    min-width: 28rem;
  }

  @include mq($from: tablet) {
    padding: $spacing-tiny $spacing-intermediate;
  }

  @each $style-name, $style-map in $_block-button-style-map {
    $_other-styles: map-get($style-map, 'other');

    &.v-btn--#{$style-name} {
      @each $style, $style-value in $style-map {
        @if ($style != 'other') {
          #{$style}: #{$style-value};
        }
      }

      &:after {
        background-color: map-get($style-map, 'background-color');
        content: '';
        display: block;
        height: 0.8rem;
        left: 1%;
        position: absolute;
        top: 103%;
        transform: rotate3d(2, 0, 0, -0.2turn) rotateX(-45deg);
        transform-origin: top;
        transition-duration: 0.3s;
        transition-property: transform, background-color, height;
        transition-timing-function: ease-in-out;
        width: 98%;
      }

      &.v-btn--loading {
        $_loading-color: map-get($_other-styles, 'loading');
        &:after {
          border-color: transparent transparent #{$_loading-color} #{$_loading-color};
        }
      }

      &.v-btn--disabled {
        $_disabled-color: map-get($_other-styles, 'disabled');
        color: $_disabled-color;
      }

      &:hover:not(.v-btn--disabled):not(:active):not(.v-btn--no-hover) {
        transform: perspective(10rem) scale(1.01);
        &:after {
          background-color: map-get($_other-styles, 'box-shadow-color');
          transform: perspective(5rem) scale(1.05) rotateX(-45deg);
        }
      }

      &:focus:not(.v-btn--disabled) {
        border-color: transparent;
        outline-color: map-get($style-map, 'background-color');
      }
    }
  }
}

.v-btn--outline {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: $spacing-mini $spacing-intermediate;
  position: relative;
  transition-duration: 0.3s;
  transition-property: color;
  transition-timing-function: ease-in-out;

  &.v-btn--active {
    .v-btn__left-content {
      left: $spacing-teeny;
      position: absolute;
    }
  }

  @include mq($until: tablet) {
    width: 100%;
  }

  @each $style-name, $style-map in $_outline-button-style-map {
    $_other-styles: map-get($style-map, 'other');
    $_background-color: map-get($_other-styles, 'selected-background-color');

    &.v-btn--#{$style-name} {
      @each $style, $style-value in $style-map {
        @if ($style != 'other') {
          #{$style}: #{$style-value};
        }
      }

      &:after {
        background-color: map-get($_other-styles, 'selected-background-color');
        content: '';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        transition-duration: 0.3s;
        transition-property: width;
        transition-timing-function: ease-in-out;
        width: 0;
        z-index: z-index('base');
      }

      &.v-btn--active {
        background-color: map-get($_other-styles, 'selected-background-color');
        color: map-get($_other-styles, 'hover-text-color');
      }

      &:hover:not(.v-btn--disabled):not(.v-btn--loading):not(.v-btn--active):not(.v-btn--no-hover) {
        color: map-get($_other-styles, 'hover-text-color');
        &:after {
          width: 100%;
        }
      }

      &:focus:not(.v-btn--disabled) {
        outline-color: map-get($_other-styles, 'selected-background-color');
      }
    }
  }
}

.v-btn--line {
  display: inline-block;
  padding: 0 0 $spacing-mini 0;
  position: relative;

  @each $style-name, $style-map in $_line-button-style-map {
    &.v-btn--#{$style-name} {
      $_button-color: map-get($style-map, 'color');
      color: $_button-color;

      &:before,
      &:after {
        background-color: $_button-color;
        bottom: 0;
        content: '';
        display: block;
        height: 3px;
        position: absolute;
        right: 0;
        transition: all ease(out-quad);
        width: 100%;
      }

      &:before {
        right: unset;
        transition-delay: 0s;
        transition-duration: 0.11s;
        width: 0;
      }
      &:after {
        transition-delay: 0.22s;
        transition-duration: 0.33s;
        width: 100%;
      }

      &:hover {
        transition-timing-function: ease(in-quad);
        &:before {
          transition-delay: 0.22s;
          transition-duration: 0.33s;
          width: 100%;
        }
        &:after {
          transition-delay: 0s;
          transition-duration: 0.11s;
          width: 0;
        }
      }

      &:focus:not(.v-btn--disabled) {
        outline-color: $_button-color;
      }
    }
  }
}

.v-btn--action {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: $spacing-mini;
  min-width: rem-value(106);
  padding: $spacing-mini $spacing-mini 0.5rem $spacing-mini;
  position: relative;
  transition: {
    duration: 0.3s;
    property: color;
    timing-function: ease-in-out;
  }

  .v-btn__content {
    line-height: 1;
  }

  &.v-btn--has-left-content,
  &.v-btn--loading {
    align-items: flex-end;
    padding: $spacing-mini;
  }

  @each $style-name, $style-map in $_action-button-style-map {
    $_other-styles: map-get($style-map, 'other');
    $_background-color: map-get($_other-styles, 'hover-background-color');

    &.v-btn--#{$style-name} {
      @each $style, $style-value in $style-map {
        @if ($style != 'other') {
          #{$style}: #{$style-value};
        }
      }

      &:after {
        background-color: $_background-color;
        content: '';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        transition: {
          duration: 0.3s;
          property: width;
          timing-function: ease-in-out;
        }
        width: 0;
        z-index: z-index('base');
      }

      .v-icon {
        transition: {
          duration: 0.2s;
          property: color;
          timing-function: ease-in-out;
        }
      }

      &:hover:not(.v-btn--disabled):not(.v-btn--loading):not(.v-btn--no-hover) {
        color: map-get($_other-styles, 'hover-text-color');
        &:after {
          width: 100%;
        }
        .v-btn__left-content .v-icon {
          color: map-get($_other-styles, 'hover-text-color') !important;
        }
      }

      &:focus:not(.v-btn--disabled) {
        outline-color: $_background-color;
      }
    }
  }
}

/* Modifiers
   ========================================================================== */

.v-btn--disabled {
  cursor: not-allowed;
  pointer-events: none;

  &.v-btn-icon,
  &.v-btn--line,
  &.v-btn--outline,
  &.v-btn--action,
  &.v-btn--block .v-btn__content {
    opacity: 0.5;
  }
}

.v-btn--loading {
  pointer-events: none;
  position: relative;
}

.v-btn--wide {
  &.v-btn--block,
  &.v-btn--outline {
    min-width: 28rem;
    @include mq($from: tablet) {
      min-width: 30rem;
    }
  }

  &.v-btn--block {
    padding: $spacing-small $spacing-teeny;
  }

  &.v-btn--outline {
    padding: $spacing-teeny $spacing-teeny;
  }
}

.v-btn--display-block {
  display: block;
  width: 100%;
}
</style>
