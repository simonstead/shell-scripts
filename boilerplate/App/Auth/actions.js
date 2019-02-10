import request from "../App/api";

const forceWindowRefreshAndRedirect = (pathname = "/") =>
  (window.location.pathname = pathname);

export const logout = () => dispatch => {
  dispatch({
    type: "LOGOUT"
  });
  forceWindowRefreshAndRedirect();
};

export const login = (event, history) => (dispatch, getState) => {
  event.preventDefault();
  dispatch({
    type: "LOGIN",
    payload: request({
      url: `${process.env.REACT_APP_API_URL}/login`,
      options: {
        method: "POST"
      },
      body: getState().form.login.values
    }).then(data => {
      // TODO: push to twofactor screen if needed
      history.push("/account");
      return data;
    })
  });
};
