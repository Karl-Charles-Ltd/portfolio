<template>
  <header class="kc-header">
    <div class="kc-header__logo">
      <nuxt-link to="/">
        <GlitchLogo :classes="['main']" theme="white" />
      </nuxt-link>
    </div>
    <div class="kc-header__nav">
      <NavDesktopBar :nav-items="navItems" />
      <NavMobileBar :nav-items="navItems" />
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Logo from '~/components/prefabs/Logo/Logo.vue';
import GlitchLogo from '~/components/prefabs/Logo/GlitchLogo.vue';
import NavDesktopBar from '~/components/prefabs/navigation/NavDesktopBar/NavDesktopBar.vue';
import NavMobileBar from '~/components/prefabs/navigation/NavMobileBar/NavMobileBar.vue';

@Component({
  components: {
    Logo,
    GlitchLogo,
    NavDesktopBar,
    NavMobileBar,
  },
})
export default class TheNavBar extends Vue {
  get navItems(): object[] {
    return [
      { name: 'Work', link: '/work' },
      { name: 'About', link: '/about' },
      { name: 'Contact', link: '/contact' },
    ];
  }
}
</script>

<style lang="scss">
.kc-header {
  align-items: center;
  border-radius: 30px;
  display: flex;

  /* filter: drop-shadow(0 0 20px lighten(color('background'), 5)); */
  padding: 1rem 1.25rem;
  position: relative;
  z-index: z-index('nav');

  &:before {
    background-color: darken(color('charcoal'), 10);
    content: '';
    height: 80%;
    left: 50%;
    position: absolute;
    top: 10%;
    width: 1px;
  }

  &__logo {
    flex: auto;
  }

  &__nav {
    flex: 1 100%;
    text-align: right;
  }
}
</style>
