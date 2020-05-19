<template>
  <div id="application">
    <!-- Symmetric Grid -->
    <SymmetricGrid />

    <!-- Introduction Animation -->
    <IntroductionAnimation />

    <!-- Audio Wrapper -->
    <AudioWrapper />

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
import RollyMixin from './rolly/RollyMixin.vue';
import SymmetricGrid from '~/layouts/SymmetricGrid/SymmetricGrid.vue';

const TheNavBar = () => import('~/components/prefabs/navigation/TheNavBar/TheNavBar.vue');
const IntroductionAnimation = () =>
  import('~/components/prefabs/intro-animation/IntroductionAnimation/IntroductionAnimation.vue');
const AudioWrapper = () => import('~/layouts/audio/AudioWrapper/AudioWrapper.vue');

@Component({
  components: {
    TheNavBar,
    AudioWrapper,
    SymmetricGrid,
    IntroductionAnimation,
  },
})
export default class DefaultLayout extends mixins(RollyMixin) {}
</script>

<style lang="scss"></style>
