import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import shared from "../../Shared/styles.scss";
import styles from "./styles.scss";
import { Link } from "react-router-dom";

export const Settings = ({ profile }) => (
  <div className={shared.Wrapper}>
    <div>
      <h1>Manage your account</h1>
      <form className={shared.Form}>
        <label>Your name</label>
        <p className={styles.ReadOnly}>
          {profile.first_name} {profile.second_name}
        </p>
        <label>Your email</label>
        <p className={styles.ReadOnly}>{profile.email}</p>
        <label>Your phone number</label>
        <p className={styles.ReadOnly}>{profile.phone}</p>
      </form>
      <h1>Your payment settings</h1>
      <form className={shared.Form}>
        {profile.stripe_user_id ? (
          <h2>You have linked your credit/debit card to our system</h2>
        ) : (
          <>
            <h2 className={shared.WarningHeader}>
              You have not linked your card with us
            </h2>
            <p className={shared.InfoSection}>
              You can{" "}
              <Link to={"/subscriptions/new"}>set up a subscription</Link> to
              your therapist so you don't have to remember to pay every week or
              top up your account.
            </p>
          </>
        )}
      </form>
      <h2>Subscription details</h2>
      <p>You have 10 hours remaining</p>
      <button className={shared.OrangeButton}>Top up your account</button>
    </div>
  </div>
);

const Form = reduxForm({ form: "settings" })(Settings);

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps)(Form);
