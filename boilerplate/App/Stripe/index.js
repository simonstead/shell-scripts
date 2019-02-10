import React from "react";
import { StripeProvider } from "react-stripe-elements";
import { connect } from "react-redux";
import { setStripe, clearStripe } from "./actions";

const API_KEY = process.env.REACT_APP_STRIPE_API_KEY;

class Stripe extends React.Component {
  constructor(props) {
    super(props);
    this.setStripe = this.props.setStripe.bind(this);
  }

  // TODO: this requires an extra refresh to actually make the payment form work
  componentDidMount() {
    if (window.Stripe) {
      this.props.setStripe(window.Stripe(API_KEY));
    } else {
      setTimeout(
        document.querySelector("#stripe-js").addEventListener("load", () => {
          // Create Stripe instance once Stripe.js loads
          this.setStripe(window.Stripe(API_KEY));
        }),
        500
      );
    }
  }
  render() {
    return (
      <StripeProvider stripe={this.props.stripe}>
        {this.props.children}
      </StripeProvider>
    );
  }
}
const mapStateToProps = ({ stripe }) => ({ stripe });
const mapDispatchToProps = {
  setStripe,
  clearStripe
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stripe);
