const initialState = {};

const setToken = (state, { token }) => ({
  token
});

const actionHandlers = {
  LOGOUT: state => initialState,
  LOGIN_FULFILLED: setToken,
  REGISTER_FULFILLED: setToken,
  CONFIRM_PHONE_FULFILLED: (state, { token, two_factor_token }) => ({
    token,
    two_factor_token
  })
};

export const reducer = (state = initialState, { type, payload }) =>
  actionHandlers[type] ? actionHandlers[type](state, payload) : state;

export default reducer;
