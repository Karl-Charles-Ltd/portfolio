<template>
  <div id="application">
    <!-- Introduction Animation -->
    <IntroductionAnimation />

    <header>
      <TheNavBar />
    </header>
    <main id="main" role="main">
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import RollyMixin from './Rolly/RollyMixin.vue';
import TheNavBar from '~/components/prefabs/navigation/TheNavBar/TheNavBar.vue';
import IntroductionAnimation from '~/components/prefabs/intro-animation/IntroductionAnimation/IntroductionAnimation.vue';

// const TheNavBar = () => import('~/components/prefabs/navigation/TheNavBar/TheNavBar.vue');
// const IntroductionAnimation = () =>
//   import('~/components/prefabs/intro-animation/IntroductionAnimation/IntroductionAnimation.vue');

@Component({
  components: {
    TheNavBar,
    IntroductionAnimation,
  },
})
export default class DefaultLayout extends mixins(RollyMixin) {}
</script>

<style lang="scss"></style>
