<template>
  <div :class="layoutItemClasses" @mouseover="$emit('mouseover')" @mouseleave="$emit('mouseleave')">
    <slot />
  </div>
</template>

<script>
import { breakpoints as availableBreakpoints } from '~/helpers/screen';
/**
 * Base Layout Item
 *
 * The Base Layout Item must only ever be used as a direct descendent of a BaseLayout.
 *
 * By default, it spans 100% width of the layout it's placed in.
 * You can alter this defauly behaviour by passing a string to the r prop, stating a ratio of column / max columns.
 *
 * <BaseLayout>
 *   <BaseLayoutItem r="1/2">   <!-- This will span one half of the width of the layout -->
 *     Content
 *   </BaseLayoutItem>
 * </BaseLayout>
 *
 * You can also change this on a per breakpoint basis, by using the breakpoint name as a prop:
 *
 * <BaseLayout>
 *   <!-- This will span one half by default, one third on tablet up, and one quarter on desktopSmall and above -->
 *   <BaseLayoutItem r="1/2" tablet="1/3" desktopSmall="1/4">
 *     Content
 *   </BaseLayoutItem>
 * </BaseLayout>
 */

const breakpointProps = availableBreakpoints.reduce(
  (props, breakpoint) => ({
    ...props,
    [breakpoint]: { type: String, default: null },
  }),
  {}
);

export default {
  name: 'BaseLayoutItem',
  props: {
    r: { type: String, default: '1/1' },
    ...breakpointProps,
  },
  computed: {
    layoutItemClasses() {
      return {
        'v-layout__item': true,
        [`u-${this.r}`]: this.r,
        ...availableBreakpoints.reduce(
          (breakpoints, breakpoint) => ({
            ...breakpoints,
            [`u-${this[breakpoint]}@${breakpoint}`]: this[breakpoint],
          }),
          {}
        ),
      };
    },
  },
};
</script>
