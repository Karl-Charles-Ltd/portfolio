<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';

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
}
</script>
