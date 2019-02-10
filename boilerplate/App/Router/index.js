import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import OnRouteChange from "./OnRouteChange";
import { connect } from "react-redux";

export const Router = ({ isLoggedIn }) => (
  <BrowserRouter>
    <OnRouteChange>
      <Routes isLoggedIn={isLoggedIn} />
    </OnRouteChange>
  </BrowserRouter>
);

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: Boolean(auth.token)
});

export default connect(mapStateToProps)(Router);
