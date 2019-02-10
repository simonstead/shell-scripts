import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import renderField from "../../Shared/InputWithErrors";
import background from "../../LandingPages/icons/people.jpg";
import shared from "../../Shared/styles.scss";
import styles from "./styles.scss";
import classNames from "classnames";
import { post } from "../../App/api";
import Errors from "../../Errors";
import { withRouter } from "react-router-dom";

const imageStyle = {
  backgroundImage: `url(${background})`,
  position: "absolute",
  height: "100vh",
  width: "100vw",
  backgroundSize: "cover",
  backgroundPosition: "right 35% top 0%",
  zIndex: "-1",
  top: "0"
};

const validateOnSubmit = (event, history) => (dispatch, getState) => {
  event.preventDefault();
  const errors = getState().form.registerTherapists.syncErrors;
  if (errors) {
    return;
  }
  dispatch({
    type: "REGISTER_THERAPIST",
    payload: post({
      url: "/register/therapists",
      body: getState().form.registerTherapists.values
    }).then(data => {
      history.push("/register/therapists/phone");
      return data;
    })
  });
  // throw new SubmissionError({
  //   username: "User does not exist",
  //   _error: "Login failed!"
  // });
};
export const RegisterTherapists = ({ history, onSubmit }) => (
  <>
    <div style={imageStyle} />
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      <h1 className={styles.Header}>Helpfound</h1>
      <Errors white />
      <form
        onSubmit={event => onSubmit(event, history)}
        className={classNames(shared.Form, styles.Form)}
      >
        <label htmlFor="first_name">First name</label>
        <Field
          name="first_name"
          component={renderField}
          type="text"
          theme="dark"
        />
        <label htmlFor="second_name">Second name</label>
        <Field
          name="second_name"
          component={renderField}
          type="text"
          theme="dark"
        />
        <label htmlFor="email">Email</label>
        <Field name="email" component={renderField} type="text" theme="dark" />
        <label htmlFor="phone">Phone number</label>
        <Field name="phone" component={renderField} type="text" theme="dark" />
        <label htmlFor="password">Choose a password</label>
        <Field
          name="password"
          component={renderField}
          type="password"
          theme="dark"
        />
        <label htmlFor="confirm_password">Confirm your password</label>
        <Field
          name="confirm_password"
          component={renderField}
          type="password"
          theme="dark"
        />
        <button
          type={"submit"}
          className={shared.StickyButtonMobile}
          style={{ margin: 0 }}
        >
          Apply to join today
        </button>
      </form>
    </div>
  </>
);

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.first_name) {
    errors.first_name = "Required";
  }
  if (!values.second_name) {
    errors.second_name = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }
  if (values.password !== values.confirm_password) {
    errors.confirm_password = "Make sure your passwords match";
  }

  return errors;
};

const mapStateToProps = () => ({});

export default withRouter(
  connect(
    mapStateToProps,
    { onSubmit: validateOnSubmit }
  )(
    reduxForm({
      form: "registerTherapists",
      validate,
      destroyOnUnmount: false
    })(RegisterTherapists)
  )
);
