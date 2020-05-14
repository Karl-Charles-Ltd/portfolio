<template>
  <div id="application">
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

@Component({
  components: {
    TheNavBar,
  },
})
export default class DefaultLayout extends mixins(RollyMixin) {}
</script>

<style lang="scss"></style>
