import { StoreMutationTypes } from '~/helpers/interfaces/store';

const types: StoreMutationTypes = {
  EXAMPLE_BOOLEAN_EVENT: 'EXAMPLE_BOOLEAN_EVENT',
  EXAMPLE_STRING_EVENT: 'EXAMPLE_STRING_EVENT',
  EXAMPLE_MIXED_EVENT: 'EXAMPLE_MIXED_EVENT',
};

interface ExampleState {
  exampleString: String;
  exampleBoolean: Boolean;
  exampleMixed: Boolean | String | null;
}

export const state = (): ExampleState => ({
  exampleBoolean: false,
  exampleString: '',
  exampleMixed: null,
});

export const getters = {
  /* eslint-disable */
  getExampleBoolean: (state: ExampleState): Boolean => {
    return state.exampleBoolean;
  },
  getExampleString: (state: ExampleState): String => {
    return state.exampleString;
  },
  getExampleMixed: (state: ExampleState): Boolean | String | null => {
    return state.exampleMixed;
  },
};

export const actions = {
  // @ts-ignore
  updateExampleBoolean({ commit }, payload: Boolean) {
    commit(types.EXAMPLE_BOOLEAN_EVENT, payload);
  },
  updateExampleString({ commit }, payload: String) {
    commit(types.EXAMPLE_STRING_EVENT, payload);
  },
  updateExampleMixed({ commit }, payload: Boolean | String | null) {
    commit(types.EXAMPLE_MIXED_EVENT, payload);
  },
};

export const mutations = {
  /* eslint-disable */
  [types.EXAMPLE_BOOLEAN_EVENT](state: ExampleState, status: Boolean) {
    state.exampleBoolean = status;
  },
  [types.EXAMPLE_STRING_EVENT](state: ExampleState, status: String) {
    state.exampleString = status;
  },
  [types.EXAMPLE_MIXED_EVENT](state: ExampleState, status: Boolean | String | null) {
    state.exampleMixed = status;
  },
};
