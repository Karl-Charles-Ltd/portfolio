const types = {
  SET_NAVIGATION_SCROLL: 'SET_NAVIGATION_SCROLL',
};

interface NavigationState {
  isScrolled: Boolean;
}

export const state = (): NavigationState => ({
  isScrolled: false,
});

export const getters = {
  getScrolledStatus: (state: NavigationState): Boolean => {
    return state.isScrolled;
  },
};

export const actions = {
  setScrolledStatus({ commit }, status) {
    commit(types.SET_NAVIGATION_SCROLL, status);
  },
};

export const mutations = {
  [types.SET_NAVIGATION_SCROLL](state: NavigationState, status: Boolean) {
    state.isScrolled = status;
  },
};
