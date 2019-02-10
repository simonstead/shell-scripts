const initialState = {
  term: "",
  preferences: {}
};
const actionHandlers = {
  SEARCH: (state, payload) => ({ ...state, term: payload.toLowerCase() }),
  SET_SEARCH_PREFERENCE: (state, payload) => ({
    ...state,
    preferences: { ...state.preferences, ...payload }
  }),
  REMOVE_SEARCH_PREFERENCE: (state, payload) => {
    const newPreferences = { ...state.preferences };
    delete newPreferences[payload];
    return {
      ...state,
      preferences: newPreferences
    };
  }
};

export const reducer = (state = initialState, { type, payload }) =>
  actionHandlers[type] ? actionHandlers[type](state, payload) : state;

export default reducer;
