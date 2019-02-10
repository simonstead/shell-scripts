const initialState = {};

const actionHandlers = {
  REGISTER_FULFILLED: (state, { client }) => ({ ...state, ...client }),
  LOGIN_FULFILLED: (state, { profile }) => ({ ...state, ...profile }),
  CONFIRM_PHONE_FULFILLED: (state, { profile }) => ({ ...state, ...profile }),
  UPDATE_PROFILE_FULFILLED: (state, { profile }) => ({ ...state, ...profile }),
  CONFIRM_EMAIL_FULFILLED: (state, { data }) => ({
    ...state,
    email_confirmed_at: data.email_confirmed_at
  }),
  UPLOAD_PHOTO_FULFILLED: (state, { image_url }) => ({ ...state, image_url }),
  LOGOUT: state => initialState
};

export const reducer = (state = initialState, { type, payload }) =>
  actionHandlers[type] ? actionHandlers[type](state, payload) : state;

export default reducer;
