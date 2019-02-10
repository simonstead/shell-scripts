const initialState = "";

export const reducer = (state = initialState, { type, payload }) => {
  if (new RegExp(/.*REJECTED/g).test(type)) {
    window.scrollTo(0, 0);
    return payload.error || payload.msg || "Something went wrong";
  } else if (new RegExp(/.*FULFILLED/g).test(type)) {
    return initialState;
  }
  return state;
};

export default reducer;
