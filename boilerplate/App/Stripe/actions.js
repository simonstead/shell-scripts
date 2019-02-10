export const setStripe = stripe => dispatch =>
  dispatch({
    type: "SET_STRIPE",
    payload: stripe
  });

export const clearStripe = () => dispatch =>
  dispatch({
    type: "CLEAR_STRIPE"
  });
