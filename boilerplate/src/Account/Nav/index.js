import React from "react";
import { connect } from "react-redux";
import styles from "../styles.scss";
import { Link } from "react-router-dom";
import { logout } from "../../Auth/actions";

export const Nav = ({ onLogout }) => (
  <nav className={styles.Nav}>
    <ul>
      <li>
        <Link to={"/account"}>
          <span>Home</span> <i className="fas fa-2x fa-home" />
        </Link>
      </li>
      <li>
        <Link to={"/account/settings"}>
          <span>Settings</span> <i className="fas fa-2x fa-cog" />
        </Link>
      </li>
      <li className={styles.Logout}>
        <button onClick={onLogout}>
          <span>Logout</span> <i className="fas fa-2x fa-sign-out-alt" />
        </button>
      </li>
    </ul>
  </nav>
);

export default connect(
  state => state,
  { onLogout: logout }
)(Nav);
