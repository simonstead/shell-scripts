import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import renderField from "../../../Shared/InputWithErrors";
import background from "../../../LandingPages/icons/people.jpg";
import shared from "../../../Shared/styles.scss";
import styles from "../styles.scss";
import classNames from "classnames";
import { post } from "../../../App/api";
import Errors from "../../../Errors";
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
    type: "CONFIRM_PHONE",
    payload: post({
      url: "/login/sms",
      body: {
        ...getState().form.registerTherapists.values
      }
    }).then(data => {
      history.push("/profile-photo");
      return data;
    })
  });
};
export const ConfirmPhone = ({ history, onSubmit }) => (
  <>
    <div style={imageStyle} />
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      <h1 className={styles.Header}>Confirm your phone number</h1>
      <Errors white />
      <form
        onSubmit={event => onSubmit(event, history)}
        className={classNames(shared.Form, styles.Form)}
      >
        <label htmlFor="code">Enter your 6 digit code we just sent you</label>
        <Field
          name="code"
          component={renderField}
          type="text"
          style={{ background: "white" }}
        />
        <button
          type={"submit"}
          className={shared.StickyButtonMobile}
          style={{ margin: 0 }}
        >
          Submit
        </button>
      </form>
    </div>
  </>
);

const validate = ({ code }) => {
  const errors = {};
  if (!code || code.length !== 6) {
    errors.code = "Enter your 6 digit code";
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
    })(ConfirmPhone)
  )
);
