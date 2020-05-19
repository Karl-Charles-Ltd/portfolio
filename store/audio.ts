const types = {
  SET_CURRENT_TRACK: 'SET_CURRENT_TRACK',
  SET_PLAYLIST: 'SET_PLAYLIST',
  SET_PLAYBACK_OPTIONS: 'SET_PLAYBACK_OPTIONS',
};

interface PlaybackOptions {
  paused: boolean;
  muted: boolean;
  loop: boolean;
}

interface Audio {
  selectedTrack: HTMLAudioElement | null;
  playlist: Array<HTMLAudioElement>;
  playbackOptions: PlaybackOptions;
}

export const state = (): Audio => ({
  selectedTrack: null,
  playlist: [],
  playbackOptions: {
    paused: false,
    muted: false,
    loop: true,
  },
});

export const getters = {
  getNextUpTrack: (state: Audio): HTMLAudioElement => {
    return state.playlist[0];
  },
  isPaused: (state: Audio): boolean => {
    return state.playbackOptions.paused;
  },
  isMuted: (state: Audio): boolean => {
    return state.playbackOptions.muted;
  },
  isLooping: (state: Audio): boolean => {
    return state.playbackOptions.loop;
  },
};

export const actions = {
  loadTracks: async ({ commit, dispatch }, self) => {
    try {
      const trax = await self.$axios.$get('/audio/*.mp3');

      await commit(types.SET_PLAYLIST, trax);
      await dispatch('setSelectedTrack');
    } catch (error) {
      throw new Error(error);
    }
  },
  setSelectedTrack: ({ commit, rootState }) => {
    const currentState = rootState;
    const nextTrack = currentState.playlist.shift();
    const newPlaylist = currentState.push(nextTrack);

    commit(types.SET_CURRENT_TRACK, nextTrack);
    commit(types.SET_PLAYLIST, newPlaylist);
  },
  /**
   * This method is flexible and can handle any update
   * to the playbackOptions object using a loop to
   * map out all the changes to the state
   *
   * @param commit
   * @param playbackOption
   */
  setPlaybackOption: ({ commit }, playbackOption: PlaybackOptions) => {
    commit(types.SET_PLAYBACK_OPTIONS, playbackOption);
  },
};

export const mutations = {
  [types.SET_CURRENT_TRACK](state: Audio, track: HTMLAudioElement) {
    state.selectedTrack = track;
  },
  [types.SET_PLAYLIST](state: Audio, tracks: Array<HTMLAudioElement>) {
    state.playlist = tracks;
  },
  [types.SET_PLAYBACK_OPTIONS](state: Audio, playbackOption: PlaybackOptions) {
    Object.keys(playbackOption).forEach((key) => {
      state.playbackOptions[key] = playbackOption[key];
    });
  },
};
