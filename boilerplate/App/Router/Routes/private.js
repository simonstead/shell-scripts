import React from "react";
import { Route } from "react-router-dom";
import Login from "../../../Auth/Login";

import Nav from "../../../Account";
import Settings from "../../../Account/Settings";
// import Calendar from "../../../Account/Calendar";
import MyTherapist from "../../../Account/MyTherapist";
import SetupAccount from "../../../Account/Setup";

import AppointentDetails from "../../../Appointments/Details";

import PayForAppointment from "../../../Appointments/Pay";
import AcceptAppointment from "../../../Appointments/Accept";

import ConfirmEmail from "../../../Auth/ConfirmEmail";

import asyncWrapper from "../../Async";

const Calendar = asyncWrapper(() => import("../../../Account/Calendar"));
// const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
//     }
//   />
// );

export const PrivateRoutes = ({ isLoggedIn }) => (
  <>
    <Route
      exact
      path={"/account"}
      component={isLoggedIn ? Nav : () => <div />}
    />
    <Route
      exact
      path={"/account-setup"}
      component={isLoggedIn ? SetupAccount : Login}
    />
    <Route
      exact
      path={"/account/settings"}
      component={isLoggedIn ? Settings : Login}
    />
    <Route
      exact
      path={"/account/calendar"}
      component={isLoggedIn ? Calendar : Login}
    />
    <Route
      exact
      path={"/account/therapist"}
      component={isLoggedIn ? MyTherapist : Login}
    />
    <Route
      exact
      path={"/account/appointments/:id"}
      component={isLoggedIn ? AppointentDetails : Login}
    />
    <Route
      exact
      path={"/accept-appointment/:id"}
      component={isLoggedIn ? AcceptAppointment : Login}
    />
    <Route exact path={"/pay/:id"} component={PayForAppointment} />
    <Route exact path="/confirm-email/:nonce" component={ConfirmEmail} />
  </>
);

export default PrivateRoutes;
