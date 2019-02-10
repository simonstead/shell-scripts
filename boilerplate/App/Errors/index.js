import React from "react";
import { connect } from "react-redux";
import styles from "./styles.scss";

const Errors = ({ error, white }) =>
  error ? (
    <div className={styles.Container}>
      <div
        className={styles.Error}
        style={{ background: white ? "white" : "transparent" }}
      >
        <i className="fas fa-exclamation-triangle" />
        {error}
      </div>
    </div>
  ) : null;

export default connect(({ error }) => ({ error }))(Errors);
