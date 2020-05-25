<template>
  <nav class="kc-nav--desktop">
    <ul>
      <li v-for="(item, index) in navItems" :key="index">
        <nuxt-link :to="item.link" :title="item.name" prefetch>
          {{ item.name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class NavDesktopBar extends Vue {
  @Prop({ default: {} }) readonly navItems: object;
}
</script>

<style lang="scss">
@import '~sass-mq';

.kc-nav--desktop {
  @include mq($until: smallDesk) {
    display: none;
  }

  ul {
    li {
      display: inline-block;
      margin: 0 0 0 1.5rem;

      a {
        color: color('grey-one');
        font-family: font('secondary');
        font-size: 2rem;
        text-decoration: none;
      }
    }
  }
}
</style>
