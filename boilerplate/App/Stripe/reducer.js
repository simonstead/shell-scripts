const initialState = null;

const actionHandlers = {
  SET_STRIPE: (state, stripe) => stripe,
  CLEAR_STRIPE: (state, stripe) => initialState
};

export const reducer = (state = initialState, { type, payload }) =>
  actionHandlers[type] ? actionHandlers[type](state, payload) : state;

export default reducer;
