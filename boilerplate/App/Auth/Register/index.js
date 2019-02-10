import React from "react";
import { connect } from "react-redux";
import styles from "./styles.scss";
import FormTemplate from "./Pages/FormTemplate";
import { pagesInOrder } from "./Pages/pageOrder";
import classNames from "classnames";
import shared from "../../Shared/styles.scss";
import Layout from "../../App/Layouts/Public";
import background from "../joining.jpg";

const DefaultRegistrationContent = () => (
  <div>
    <h1>Sign up</h1>
    <p>
      It only takes 3 minutes to register, and we'll get you an appointment in
      as little as 24 hours.
    </p>
  </div>
);

const RegisterWithAppointmentContent = () => (
  <div>
    <h1>All set!</h1>
    <p>Just fill in your details and we'll schedule your appointment</p>
  </div>
);

export const Register = ({
  currentPageIndex,
  newAppointment,
  shouldShowDefaultContent
}) => (
  <Layout backgroundImage={background} theme="dark">
    <div className={classNames(styles.Register, shared.ContentBlock)}>
      {shouldShowDefaultContent ? (
        <DefaultRegistrationContent />
      ) : (
        <RegisterWithAppointmentContent />
      )}
      <FormTemplate>{pagesInOrder[currentPageIndex]}</FormTemplate>
    </div>
  </Layout>
);

export default connect(
  ({ register: { currentPageIndex }, newAppointment }) => ({
    currentPageIndex,
    newAppointment,
    shouldShowDefaultContent: !(
      newAppointment.day &&
      newAppointment.time &&
      newAppointment.therapist
    )
  })
)(Register);
