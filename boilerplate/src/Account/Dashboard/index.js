import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import { initialAppSetup } from "./actions";
import shared from "../../Shared/styles.scss";

const Hello = ({ name }) => <div className={styles.Hello}>Hello, {name}</div>;

const Settings = () => (
  <Link to={"/account/settings"} className={styles.Settings}>
    <i className={"fas fa-cogs fa-5x"} />
    Settings
  </Link>
);

class Dashboard extends Component {
  componentDidMount() {
    this.props.isLoggedIn && this.props.hydrate();
  }

  render() {
    const { name } = this.props;

    return (
      <div className={styles.DashboardWrapper}>
        <Hello name={name} />
        <button className={shared.OrangeButton}>Action</button>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  name: state.profile.first_name
});

export default connect(
  mapStateToProps,
  { hydrate: initialAppSetup }
)(Dashboard);
