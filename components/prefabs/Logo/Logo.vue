<template>
  <div class="logo">
    <div class="logo__shape">
      <div class="line --one" :style="styles"></div>
      <div class="line --two" :style="styles"></div>
      <div class="line --three" :style="styles"></div>
    </div>
    <div v-if="withText" class="logo__text"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { colorFromTheme } from '~/helpers/colors';

const availableColors: string[] = ['primary', 'secondary', 'quinary', 'black', 'white'];

@Component
export default class Logo extends Vue {
  @Prop({ default: false }) readonly withText!: boolean;
  @Prop({ default: true }) readonly brighten!: boolean;
  @Prop({ default: 'secondary', validator: (value) => availableColors.includes(value) })
  readonly theme!: string;

  get styles() {
    return { backgroundColor: colorFromTheme(this.theme) };
  }
}
</script>

<style lang="scss">
.logo {
  @extend %flex--center;
  height: 100px;
  position: relative;
  width: 100px;

  &__shape {
    @extend %absolute;
    transform: rotate(270deg) translate(calc(-50% - 6px), 0);
    transform-origin: top;

    .line {
      background-color: color('secondary');
      border-radius: 1px;
      height: 100%;
      position: absolute;
      transform-origin: top;
      width: 2px;

      &.--one {
        right: 0;
        transform: rotate(60deg);
      }

      &.--two {
        right: 0;
        transform: rotate(120deg);
      }

      &.--three {
        bottom: 0;
        left: 12px;
        top: 50%;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
