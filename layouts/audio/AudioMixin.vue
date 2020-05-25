<script lang="ts">
import { Vue, Component, namespace, Watch } from 'nuxt-property-decorator';

const AudioStore = namespace('audio');

@Component
export default class Audio extends Vue {
  @AudioStore.State('selectedTrack') selectedTrack;
  @AudioStore.State('playlist') playlist;
  @AudioStore.State('playbackOptions') playbackOptions;

  @AudioStore.Action('loadTracks') loadTracks;
  @AudioStore.Action('setSelectedTrack') setSelectedTrack;
  @AudioStore.Action('setPlaybackOption') setPlaybackOption;

  @AudioStore.Getter('getNextUpTrack') getNextUpTrack;
  @AudioStore.Getter('isPaused') isPaused;
  @AudioStore.Getter('isMuted') isMuted;
  @AudioStore.Getter('isLooping') isLooping;

  public track;

  constructor() {
    super();
    this.track = this.selectedTrack;
  }

  @Watch('selectedTrack')
  onSelectedTrack() {
    // eslint-disable-next-line
    console.log(this.selectedTrack);

    this.track = Object.assign({}, this.selectedTrack.track);
  }

  public onEnded() {
    this.setSelectedTrack();
  }

  created() {
    this.loadTracks();
  }
}
</script>
