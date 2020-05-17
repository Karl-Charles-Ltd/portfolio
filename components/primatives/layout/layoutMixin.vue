<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

const alignModes: string[] = ['top', 'middle', 'bottom', 'baseline', 'stretch'];
const fillDirections: string[] = ['left', 'right', 'center', 'around', 'between', 'evenly'];
const gutters: string[] = [
  'default-pattern',
  'none',
  'tiny',
  'small',
  'base',
  'medium',
  'intermediate',
  'large',
  'immense',
];

@Component
export default class LayoutMixin extends Vue {
  @Prop({ default: false }) public readonly reverse!: boolean;
  @Prop({ default: 'top', validator: (value) => alignModes.includes(value) }) public readonly align!: string;
  @Prop({ default: 'base', validator: (value) => gutters.includes(value) }) public readonly gutter!: string;
  @Prop({ default: 'left', validator: (value) => fillDirections.includes(value) })
  public readonly fillDirection!: string;
}
</script>
