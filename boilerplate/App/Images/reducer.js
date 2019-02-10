const initialState = "";

const actionHandlers = {
  CHANGE_IMAGE: (state, payload) => payload,
  LOGOUT: state => initialState,
  LOGIN_FULFILLED: state => initialState
};

export const reducer = (state = initialState, { type, payload }) =>
  actionHandlers[type] ? actionHandlers[type](state, payload) : state;

export default reducer;
