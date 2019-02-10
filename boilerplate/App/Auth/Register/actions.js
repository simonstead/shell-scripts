import request from "../../App/api";

export const preventEventDefault = (event, next) => {
  event.preventDefault();
  next();
};

// const allFieldsOnPageAreValid = state => {
//   const fieldsOnPage = Object.keys(state.form.register.registeredFields);
//   const errors = state.form.register.syncErrors;
//   const fieldsOnPageWithErrors = fieldsOnPage.map(field =>
//     Boolean(errors[field])
//   );
//   debugger;
//   return !Boolean(fieldsOnPageWithErrors.filter(x => x).length);
// };

// TODO: either set the page url to include register/NUMBER or segment.tracks with the page to analyze funnel
export const selectedRegistrationPage = (page, dispatch) =>
  dispatch({
    type: "SELECT_REGISTRATION_PAGE",
    payload: page
  });

export const nextRegistrationPage = event => (dispatch, getState) =>
  preventEventDefault(event, () =>
    selectedRegistrationPage(getState().register.currentPageIndex + 1, dispatch)
  );

export const previousRegistrationPage = event => (dispatch, getState) =>
  preventEventDefault(event, () =>
    selectedRegistrationPage(getState().register.currentPageIndex - 1, dispatch)
  );

export const register = (event, history, reset) => (dispatch, getState) => {
  event.preventDefault();

  const formValues = getState().form.register.values;
  const appointment = getState().newAppointment;
  console.log(formValues, appointment);

  dispatch({
    type: "REGISTER",
    payload: request({
      url: `${process.env.REACT_APP_API_URL}/clients/register`,
      options: {
        method: "POST"
      },
      body: {
        register: formValues,
        appointment
      }
    }).then(data => {
      reset();
      history.push("/account");
      return data;
    })
  });
};
