import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { clearSearch } from "../../../Search/actions";
import { clearStripe } from "../../Stripe/actions";
import ReactGA from "react-ga";

const scrollToTopOfPageIfTheUrlChanges = (oldPathname, newPathname) =>
  oldPathname !== newPathname && window.scrollTo(0, 0);

class OnRouteChange extends React.Component {
  constructor(props) {
    super(props);
    this.props.clearStripe();
  }

  componentDidUpdate(previousProps) {
    if (this.props.location.pathname !== previousProps.location.pathname) {
      this.props.clearSearch();
      ReactGA.pageview(window.location.pathname + window.location.search);
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const mapStateToProps = ({ auth: token }) => ({ isLoggedIn: Boolean(token) });

export default withRouter(
  connect(
    mapStateToProps,
    { clearSearch, clearStripe }
  )(OnRouteChange)
);
