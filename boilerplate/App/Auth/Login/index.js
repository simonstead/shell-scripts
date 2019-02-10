import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import shared from "../../Shared/styles.scss";
import classNames from "classnames";
import { login } from "../actions";
import styles from "./styles.scss";
import renderField from "../../Shared/InputWithErrors";
import Layout from "../Layouts/Public";
import background from "../joining.jpg";

export const Login = ({ onSubmit, pristine, submitting, history }) => (
  <Layout backgroundImage={background} theme="dark">
    <h1 className={shared.DarkHeading}>Sign in to your account</h1>
    <form
      onSubmit={event => onSubmit(event, history)}
      className={classNames(shared.Form, styles.Login)}
    >
      <label htmlFor="email">Email address</label>
      <Field name="email" component={renderField} type="email" theme="dark" />
      <label htmlFor="password">Password</label>
      <Field
        name="password"
        component={renderField}
        type="password"
        theme="dark"
      />
      <button
        type="submit"
        className={shared.Button}
        disabled={pristine || submitting}
      >
        Log in
      </button>
      <label>Forgotten your password?</label>
      <Link className={shared.DarkBorderLink} to={"/password-reset"}>
        click here to reset it
      </Link>
      <label>Don't have an account?</label>
      <Link className={shared.DarkBorderLink} to={"/register"}>
        click here to sign up
      </Link>
    </form>
  </Layout>
);

const mapStateToProps = () => ({});
const mapDispatchToProps = { onSubmit: login };

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 5) {
    errors.password =
      "Your password must contain at least 10 upper and lower case characters, with a number";
  }
  return errors;
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(reduxForm({ form: "login", validate })(Login))
);
