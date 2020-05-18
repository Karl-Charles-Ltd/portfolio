<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class VideoMixin extends Vue {
  @Prop({ default: false }) readonly hasControls!: boolean;
  @Prop({ default: true }) readonly autoplay!: boolean;
  @Prop({ default: true }) readonly muted!: boolean;
  @Prop({ default: true }) readonly loop!: boolean;
}
</script>
