<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';

@Component
export default class ModalMixin extends Vue {
  @Prop({ default: false }) readonly isOpen!: boolean;
  @Prop({ default: true }) readonly overlayCoverNav!: boolean;

  @Watch('isOpen')
  setBackgroundAriaHidden() {
    this.$store.dispatch('scroll/setScrollDisabled', this.isOpen);
    this.$store.dispatch('overlay/toggleOverlay', { usedBy: 'TheModal', coverNav: this.overlayCoverNav });

    if (!document) return;
    const main = document.querySelector('main');
    if (!main) return;
    main.setAttribute('aria-hidden', String(this.isOpen));
  }
}
</script>
