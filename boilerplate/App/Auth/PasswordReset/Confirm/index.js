import React from "react";
import styles from "./styles.scss";
import Layout from "../../../App/Layouts/Public";
import { Link } from "react-router-dom";
export const PasswordResetConfirm = () => (
  <Layout>
    <div className={styles.PasswordResetConfirm}>
      <h1>Click the link in your email to reset your password</h1>
      <Link to={"/"}>Back to home page</Link>
    </div>
  </Layout>
);

export default PasswordResetConfirm;
