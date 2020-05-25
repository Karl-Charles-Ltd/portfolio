<template>
  <nav class="kc-nav--mobile">
    <ul>
      <li v-for="(item, index) in navItems" :key="index">
        <nuxt-link :to="item.link" :title="item.name">
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class NavMobileBar extends Vue {
  @Prop({ default: {} }) readonly navItems: object;
}
</script>

<style lang="scss">
@import '~sass-mq';

.kc-nav--mobile {
  flex: 1 100%;
  text-align: right;

  @include mq($from: smallDesk) {
    display: none;
  }
}
</style>
