import React from "react";
import { connect } from "react-redux";
import styles from "./styles.scss";
import { post } from "../../api";
import { withRouter, Link } from "react-router-dom";

const confirmEmail = nonce => (dispatch, getState) =>
  dispatch({
    type: "CONFIRM_EMAIL",
    payload: post({
      url: "/confirm-email",
      token: getState().auth.token,
      body: nonce
    })
  });

class ConfirmEmail extends React.Component {
  constructor(props) {
    super(props);
    this.props.confirmEmail(this.props.match.params.nonce);
  }

  render() {
    return this.props.loading ? (
      <h1>Confirming your email...</h1>
    ) : (
      <div>
        <p>
          {this.props.emailIsConfirmed
            ? "Thanks for confirming your email"
            : "something went wrong, try refreshing the page or contact us on live chat"}
        </p>
        <Link to={"/account"}>Go to my account</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ loading, profile }) => ({
  loading,
  emailIsConfirmed: profile.email_confirmed_at
});

const mapDispatchToProps = {
  confirmEmail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConfirmEmail));
