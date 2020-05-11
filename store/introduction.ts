import { StoreMutationTypes } from '~/helpers/interfaces/store';

const types: StoreMutationTypes = {
  SET_INTRO_ANIMATION_STATUS: 'SET_INTRO_ANIMATION_STATUS',
};

interface IntroductionState {
  longAnimation: Boolean;
}

export const state = (): IntroductionState => ({
  longAnimation: false,
});

export const getters = {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  getIntroductionAnimationStatus: (state: IntroductionState): Boolean => {
    return state.longAnimation;
  },
};

export const actions = {
  // @ts-ignore
  updateIntroductionAnimationStatus({ commit }, status: Boolean) {
    commit(types.SET_INTRO_ANIMATION_STATUS, status);
  },
};

export const mutations = {
  /* eslint-disable-next-line */
  [types.SET_INTRO_ANIMATION_STATUS](state: IntroductionState, status: Boolean) {
    state.longAnimation = status;
  },
};
