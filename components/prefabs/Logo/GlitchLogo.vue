<template>
  <div id="logo--glitch">
    <Logo :class="['logo--small', ...classes]" :theme="theme" :style="primaryTheme" />
    <Logo :class="['logo--medium', ...classes]" :theme="getLighterColor()" :style="secondaryTheme" />
    <Logo :class="['logo--large', ...classes]" :theme="getDarkerColor()" :style="tertiaryTheme" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import Logo from '~/components/prefabs/Logo/Logo.vue';
import { colorFromTheme } from '~/helpers/colors';

const availableThemes: string[] = ['secondary', 'quinary', 'quinary-light', 'white'];

@Component({
  components: {
    Logo,
  },
})
export default class GlitchLogo extends Vue {
  @Prop({ default: 10 }) readonly shadowDepth: number;
  @Prop({ default: [] }) readonly classes: string[];
  @Prop({ default: 'secondary', validator: (value) => availableThemes.includes(value) })
  readonly theme: string;

  get primaryTheme(): object {
    return {
      filter: `brightness(1) drop-shadow(0 0 ${this.shadowDepth}px ${colorFromTheme(this.theme)})`,
    };
  }

  get secondaryTheme(): object {
    const lighter = () => this.getLighterColor();
    return {
      filter: `brightness(1) drop-shadow(0 0 ${this.shadowDepth}px ${colorFromTheme(lighter())})`,
    };
  }

  get tertiaryTheme(): object {
    const darker = () => this.getDarkerColor();
    return {
      filter: `brightness(1) drop-shadow(0 0 ${this.shadowDepth}px ${colorFromTheme(darker())})`,
    };
  }

  private getLighterColor(): string | undefined {
    try {
      switch (this.theme) {
        case 'quinary' || 'secondary':
          return 'quinary-light';
        case 'white':
          return 'grey-two';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  private getDarkerColor(): string | undefined {
    try {
      switch (this.theme) {
        case 'quinary' || 'secondary':
          return 'quinary-dark';
        case 'white':
          return 'grey-one';
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
</script>

<style lang="scss">
#logo--glitch {
  @extend %flex--center;
  height: 100px;
  transform: scale(0.5);
  width: 100px;

  .logo {
    clip: rect(0, 900px, 0, 0);
    filter: brightness(1) drop-shadow(0 0 10px color('secondary'));
    opacity: 0;
    position: absolute;
    transform: scale(1.25);

    &--small {
      position: relative;
    }

    &--medium {
      animation: noise-anim-alt 3s infinite ease-in-out alternate-reverse;
      filter: brightness(0.75);
      height: 125px;
      width: 125px;
    }

    &--large {
      animation: noise-anim 7s infinite ease-in-out alternate-reverse;
      filter: brightness(0.75);
      height: 150px;
      width: 150px;
    }
  }
}
</style>
