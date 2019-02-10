import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { reduxForm } from "redux-form";
import shared from "../../../Shared/styles.scss";
import styles from "../styles.scss";
import classNames from "classnames";
import {
  nextRegistrationPage,
  previousRegistrationPage,
  register
} from "../actions";
import { numberOfPages } from "./pageOrder";

export const FormTemplate = ({
  onNextClick,
  onPreviousClick,
  onSubmit,
  children,
  pageIsNotFirstPage,
  pageIsNotLastPage,
  pageIsLastPage,
  pristine,
  history,
  reset
}) => (
  <form
    className={classNames(shared.Form)}
    onSubmit={event => onSubmit(event, history, reset)}
  >
    {[children].map((Child, i) => (
      <Child key={i} />
    ))}
    <div className={styles.ButtonContainer}>
      {pageIsNotFirstPage && (
        <button onClick={onPreviousClick} className={shared.ButtonSecondary}>
          back
        </button>
      )}
      {pageIsNotLastPage && (
        <button
          onClick={onNextClick}
          className={shared.Button}
          disabled={pristine}
        >
          Next
        </button>
      )}
      {pageIsLastPage && (
        <button type="submit" className={shared.Button}>
          Set up my account
        </button>
      )}
    </div>
  </form>
);

const Container = connect(
  ({ register: { currentPageIndex } }) => ({
    pageIsNotFirstPage: currentPageIndex !== 0,
    pageIsNotLastPage: currentPageIndex < numberOfPages - 1,
    pageIsLastPage: currentPageIndex === numberOfPages - 1
  }),
  {
    onNextClick: nextRegistrationPage,
    onPreviousClick: previousRegistrationPage,
    onSubmit: register
  }
)(FormTemplate);

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
  } else if (values.password.length < 5) {
    errors.password =
      "Your password must contain at least 10 upper and lower case characters, with a number";
  }

  if (!values.confirm_password) {
    errors.confirm_password =
      "Enter your password again to make sure you typed it correctly";
  } else if (values.confirm_password !== values.password) {
    errors.confirm_password =
      "Make sure your passwords match before carrying on";
  }

  return errors;
};

export default withRouter(
  reduxForm({
    form: "register",
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    shouldError: ({ initialRender }) => !initialRender,
    validate
  })(Container)
);
