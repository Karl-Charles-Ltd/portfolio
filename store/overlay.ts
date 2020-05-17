import { StoreMutationTypes } from '~/helpers/interfaces/store';

interface OverlayState {
  coverNav: boolean;
  usedBy: string[];
}

const types: StoreMutationTypes = {
  PUT_OVERLAY_STATE: 'PUT_OVERLAY_STATE',
  REMOVE_OVERLAY_USER: 'REMOVE_OVERLAY_USER',
  RESET_OVERLAY_STATE: 'RESET_OVERLAY_STATE',
};

export const state = (): OverlayState => ({
  coverNav: true,
  usedBy: [],
});

interface ToggleTypes {
  coverNav?: boolean;
  usedBy: string;
}

export const actions = {
  toggleOverlay({ state, commit }, { coverNav = true, usedBy }: ToggleTypes) {
    if (!usedBy || !usedBy.length) throw new Error('[overlay/toggleOverlay] usedBy is undefined.');

    if (state.usedBy.includes(usedBy)) {
      const updatedUsedBy = state.usedBy.filter((user) => user !== usedBy);
      commit(types.PUT_OVERLAY_STATE, { coverNav, usedBy: updatedUsedBy });
    } else {
      commit(types.PUT_OVERLAY_STATE, { coverNav, usedBy: [...state.usedBy, usedBy] });
    }
  },
};

export const mutations = {
  [types.PUT_OVERLAY_STATE](state, newState) {
    state.coverNav = newState.coverNav;
    state.usedBy = newState.usedBy;
  },
};
