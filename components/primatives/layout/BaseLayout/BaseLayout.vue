<template>
  <div :class="layoutClasses"><slot /></div>
</template>

<script lang="ts">
/**
 * Base Layout - A grid-like layout system.
 *
 * A BaseLayout must only ever have BaseLayoutItem components as immediate children.
 *
 * The layout object provides us with a column-style layout system. This file
 * contains the basic structural elements, but classes should be complemented
 * with width utilities, for example:
 *
 *   <BaseLayout>
 *     <BaseLayoutItem r="1/2">
 *     </BaseLayoutItem>
 *     <BaseLayoutItem r="1/2">
 *     </BaseLayoutItem>
 *   </BaseLayout>
 *
 * The above will create a two-column structure in which each column will
 * fluidly fill half of the width of the parent. We can have more complex
 * systems:
 *
 *   <BaseLayout>
 *     <BaseLayoutItem desktopSmall="1/3">
 *     </BaseLayoutItem>
 *     <BaseLayoutItem r="1/2" desktopSmall="1/3">
 *     </BaseLayoutItem>
 *     <BaseLayoutItem r="1/2" desktopSmall="1/3">
 *     </BaseLayoutItem>
 *   </BaseLayout>
 *
 * The above will create a system in which the first item will be 100% width
 * until we enter our desktopSmall breakpoint, when it will become 33.333% width. The
 * second and third items will be 50% of their parent, until they also become
 * 33.333% width at the desktopSmall breakpoint.
 *
 * We can also manipulate entire layout systems by adding a series of modifiers
 * to the BaseLayout block. For example:
 *
 *   <BaseLayout reverse>
 *
 * This will reverse the displayed order of the system so that it runs in the
 * opposite order to our source, effectively flipping the system over.
 *
 *   <BaseLayout fill-direction="around">
 *
 * This will cause the system to fill up from the center, putting space around the layout items.
 * Default behaviour is to fill up the layout system from the left, similar to flex-start.
 *
 *   <BaseLayout gutter="medium">
 *
 * This will cause each layout item to have a "medium" gutter size, inline with the spacing units.
 *
 *   <BaseLayout align="stretch">
 *
 * This will cause all the layout items to be of the same height.
 */

import { mixins, Prop, Component } from 'nuxt-property-decorator';
import layoutMixin from '../layoutMixin.vue';

const directions = ['row', 'column'];

@Component
export default class BaseLayout extends mixins(layoutMixin) {
  @Prop({ default: false }) readonly autoWidth!: boolean;
  @Prop({ default: false }) readonly fullWidth!: boolean;
  @Prop({ default: false }) readonly reverseFromSmallDesk!: boolean;
  @Prop({ default: false }) readonly spaceBetweenFromSmallDesk!: boolean;
  @Prop({ default: 'row', validator: (value) => directions.includes(value) }) readonly direction!: string;

  get layoutClasses() {
    return {
      'v-layout': true,
      'v-layout--auto': this.autoWidth,
      'v-layout--full-width': this.fullWidth,
      'v-layout--reverse': this.reverse,
      'v-layout--reverse@smallDesk': this.reverseFromSmallDesk,
      'v-layout--between@smallDesk': this.spaceBetweenFromSmallDesk,
      [`v-layout--${this.align}`]: this.align,
      [`v-layout--${this.direction}`]: this.direction,
      [`v-layout--${this.fillDirection}`]: this.fillDirection,
      [`v-layout--${this.gutter}`]: this.gutter,
    };
  }
}
</script>

<style scoped lang="scss">
@import '~sass-mq';

$flex-layout-gutter-pattern-sizes: (
  '--default': (
    'mobile': $spacing-tiny,
    'tablet': $spacing-base,
    'smallDesk': $spacing-base,
  ),
);

$flex-layout-fixed-gutter-sizes: (
  null: spacing-unit(null),
  '--none': 0,
  '--tiny': $spacing-tiny,
  '--small': $spacing-small,
  '--medium': $spacing-medium,
  '--intermediate': $spacing-intermediate,
  '--large': $spacing-large,
  '--immense': $spacing-immense,
) !default;

$flex-layout-justify-values: (
  '--left': 'flex-start',
  '--center': 'center',
  '--right': 'flex-end',
  '--between': 'space-between',
  '--around': 'space-around',
  '--evenly': 'space-evenly',
) !default;

$flex-layout-alignment-values: (
  '--top': 'flex-start',
  '--middle': 'center',
  '--bottom': 'flex-end',
  '--baseline': 'baseline',
  '--stretch': 'stretch',
) !default;

/* Default/mandatory classes
     ========================================================================== */

.v-layout {
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding: 0;
}

/**
 * 1. Cells are full-width and stack on top of each other by default.
 */

::v-deep .v-layout__item {
  flex: 0 1 auto;
  width: 100%; /* [1] */
}

/* Gutters
   ========================================================================== */

/**
 * 1. Add a negative margin on one side only. That way we aren't required to use
 *    a wrapper with the same amount of spacing, though it's common to do so.
 * 2. Neutralize the left margin on `v-layout`.
 */

@each $gutter-size-namespace, $gutter-size in $flex-layout-fixed-gutter-sizes {
  .v-layout#{$gutter-size-namespace} {
    margin-left: -#{$gutter-size}; /* [1] */
    > ::v-deep .v-layout__item {
      padding-left: $gutter-size; /* [2] */
    }
  }
}

/**
 * Responsive pattern gutters
 */

@each $gutter-size-namespace, $gutter-map in $flex-layout-gutter-pattern-sizes {
  .v-layout#{$gutter-size-namespace}-pattern {
    @each $breakpoint, $gutter-size in $gutter-map {
      @include mq($from: $breakpoint) {
        margin-left: -#{$gutter-size}; /* [1] */
        > ::v-deep .v-layout__item {
          padding-left: $gutter-size; /* [2] */
        }
      }
    }
  }
}

/* Automatically size cells by distributing them equally
   ========================================================================== */

.v-layout--auto {
  > ::v-deep .v-layout__item {
    flex: 1 0 0;
  }
}

.v-layout--full-width {
  width: 100%;
}

/* Horizontal alignment
   ========================================================================== */

@each $namespace, $value in $flex-layout-justify-values {
  .v-layout#{$namespace} {
    justify-content: #{$value};
  }
}

.v-layout--between\@smallDesk {
  justify-content: center;
  @include mq($from: smallDesk) {
    justify-content: space-between;
  }
}

/* Vertical alignment
   ========================================================================== */

@each $namespace, $value in $flex-layout-alignment-values {
  .v-layout#{$namespace} {
    align-items: #{$value};
  }

  ::v-deep .v-layout__item#{$namespace} {
    align-self: #{$value};
  }
}

/* Content distribution
   ========================================================================== */

.v-layout--reverse {
  @include mq($from: 'tablet') {
    flex-direction: row-reverse;
  }
}

.v-layout--reverse\@smallDesk {
  @include mq($from: smallDesk) {
    flex-direction: row-reverse;
  }
}

.v-layout--column {
  flex-direction: column;

  &.v-layout--reverse {
    flex-direction: column-reverse;
  }
}
</style>
