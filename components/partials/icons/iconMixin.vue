<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';
import { validateTheme } from '~/helpers/validators';

const availableDirections: string[] = ['up', 'right', 'down', 'left'];

@Component
export default class IconMixin extends Vue {
  @Prop({ default: false }) readonly disc!: boolean;
  @Prop({ default: 0 }) readonly number!: number;
  @Prop({ default: null, validator: (value) => availableDirections.includes(value) })
  readonly direction!: string;

  @Prop({ default: 'primary', validator: (value) => validateTheme(value) })
  readonly theme!: string;
}
</script>
