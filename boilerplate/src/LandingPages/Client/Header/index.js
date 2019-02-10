import React from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../Auth/actions";

const darkTheme = { color: "white", background: "rgba(0,0,0,0.2)" };

export const Header = ({ isLoggedIn, onLogout, theme }) => (
  <div className={theme === "dark" ? styles.DarkHeader : styles.Header}>
    <Link to={isLoggedIn ? "/account" : "/"}>
      <h1>Helpfound</h1>
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
