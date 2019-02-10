import request from "../../App/api";

export const initialAppSetup = () => (dispatch, getState) => {
  dispatch({
    type: "GET_PROFILE",
    payload: request({
      url: `${process.env.REACT_APP_API_URL}/clients/profile`,
      token: getState().auth.token
    })
  });
};
