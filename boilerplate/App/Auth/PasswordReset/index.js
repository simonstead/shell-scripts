import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import styles from "./styles.scss";
import shared from "../../Shared/styles.scss";
import { post } from "../../App/api";
import Layout from "../../App/Layouts/Public";
import background from "../joining.jpg";

const testAction = history => (dispatch, getState) =>
  dispatch({
    type: "TEST_ACTION",
    payload: post({
      url: "/password-reset",
      token: getState().auth.token,
      body: getState().form.passwordReset.values
    }).then(data => {
      history.push("/password-reset-confirm");
      return data;
    })
  });

export const PasswordReset = ({ onSubmit, history, pristine }) => (
  <Layout backgroundImage={background} theme="dark">
    <form
      className={styles.PasswordReset}
      onSubmit={event => {
        event.preventDefault();
        onSubmit(history);
      }}
    >
      <h1 className={shared.DarkHeading}>Reset your password</h1>
      <p>
        If you know your password <Link to={"/login"}>click here log in</Link>.
      </p>
      <div className={shared.Form}>
        <label htmlFor="email">Reset your password</label>
        <Field name="email" type="email" component="input" />
        <button className={shared.Button} type="submit" disabled={pristine}>
          Submit
        </button>
      </div>
      <p>
        Don't have an account? <Link to={"/register"}>Sign up</Link>. .
      </p>
    </form>
  </Layout>
);

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  onSubmit: testAction
};

const Form = reduxForm({ form: "passwordReset" })(PasswordReset);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Form));
