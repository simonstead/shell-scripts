import React from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../Auth/actions";

export const Header = ({ isLoggedIn, onLogout }) => (
  <div className={styles.Header}>
    <Link to={isLoggedIn ? "/account" : "/"}>
      <h1>App name</h1>
    </Link>
    {isLoggedIn ? (
      <button onClick={onLogout}>Log out</button>
    ) : (
      <Link to={"/login"}>Log in</Link>
    )}
  </div>
);

export default connect(
  ({ auth }) => ({
    isLoggedIn: Boolean(auth.token)
  }),
  { onLogout: logout }
)(Header);
