<script lang="ts">
// @TODO - Remove the wrapping script tag and change this filename to 'buttonMixin.ts' once UWA-56 is resolved
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { validateTheme } from '~/helpers/validators';

const nativeTypes: string[] = ['button', 'submit', 'reset'];
const availableTags: string[] = ['button', 'a', 'nuxt-link', 'BaseLink'];

@Component
export default class ButtonMixin extends Vue {
  @Prop({ default: false }) readonly active!: boolean;
  @Prop({ default: false }) readonly disabled!: boolean;
  @Prop({ default: false }) readonly loading!: boolean;
  @Prop({ default: false }) readonly noHover!: boolean;
  @Prop({ default: 'button', validator: (value) => availableTags.includes(value) }) readonly tag!: string;
  @Prop({ default: 'button', validator: (value) => nativeTypes.includes(value) })
  readonly nativeType!: string;

  @Prop({ default: 'secondary', validator: (value) => validateTheme(value) })
  readonly theme!: string;

  focus: boolean = false;

  get buttonClasses() {
    return {
      'v-btn': true,
      [`v-btn--${this.theme}`]: this.theme,
      'v-btn--disabled': this.disabled,
      'v-btn--active': this.active,
      'v-btn--loading': this.loading,
      'v-btn--no-hover': this.noHover,
    };
  }

  get buttonListeners() {
    if (!this.disabled && !this.loading) {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        click(event) {
          vm.$emit('click', event);
        },
        focus(event) {
          vm.onFocus();
          vm.$emit('focus', event);
        },
        blur(event) {
          vm.onBlur();
          vm.$emit('blur', event);
        },
      });
    }
  }

  onFocus() {
    this.focus = true;
  }

  onBlur() {
    this.focus = false;
  }
}
</script>
