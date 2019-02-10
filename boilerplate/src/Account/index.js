import React from "react";
import { connect } from "react-redux";
import Nav from "./Nav";
import styles from "./styles.scss";
import Layout from "../App/Layouts/Private";
import WelcomeBanner from "./WelcomeBanner";
import Dashboard from "./Dashboard";

export const Account = ({ roles }) => (
  <Layout>
    {roles && roles.indexOf("therapist") >= 0 ? (
      <TherapistAccount />
    ) : (
      <>
        <WelcomeBanner />
        <div className={styles.Account}>
          <Dashboard />
        </div>
      </>
    )}
  </Layout>
);

export default connect(({ profile: { roles } }) => ({ roles }))(Account);
