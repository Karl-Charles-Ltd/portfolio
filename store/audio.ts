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

interface AudioStore {
  selectedTrack: Object | null;
  playlist: Array<string>;
  playbackOptions: PlaybackOptions;
}

export const state = (): AudioStore => ({
  selectedTrack: null,
  playlist: [],
  playbackOptions: {
    paused: false,
    muted: false,
    loop: true,
  },
});

export const getters = {
  getNextUpTrack: (state): HTMLAudioElement => {
    return state.playlist[0];
  },
  isPaused: (state): boolean => {
    return state.playbackOptions.paused;
  },
  isMuted: (state): boolean => {
    return state.playbackOptions.muted;
  },
  isLooping: (state): boolean => {
    return state.playbackOptions.loop;
  },
};

export const actions = {
  loadTracks: async ({ commit, dispatch }) => {
    try {
      const trax = await require('~/static/audio/');
      let list = []; // eslint-disable-line

      // @ts-ignore
      await Object.keys(trax).forEach((track) => list.push(trax[track].default));

      await commit(types.SET_PLAYLIST, list);
      await dispatch('setSelectedTrack');
    } catch (error) {
      throw new Error(error);
    }
  },
  setSelectedTrack: ({ commit, rootState }) => {
    const currentPlaylist = rootState.audio.playlist.map((track) => track);
    const nextTrack = currentPlaylist.shift();

    currentPlaylist.push(nextTrack);

    commit(types.SET_CURRENT_TRACK, nextTrack);
    commit(types.SET_PLAYLIST, currentPlaylist);
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
  [types.SET_CURRENT_TRACK](state: AudioStore, track: string) {
    state.selectedTrack = { track };
  },
  [types.SET_PLAYLIST](state: AudioStore, tracks: Array<string>) {
    state.playlist = tracks;
  },
  [types.SET_PLAYBACK_OPTIONS](state: AudioStore, playbackOption: PlaybackOptions) {
    Object.keys(playbackOption).forEach((key) => {
      state.playbackOptions[key] = playbackOption[key];
    });
  },
};
