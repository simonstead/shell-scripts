import React from "react";
import { Route } from "react-router-dom";
import Login from "../../../Auth/Login";

import Availability from "../../../TherapistAccount/Availability";
import Appointments from "../../../TherapistAccount/Appointments";
import NewAppointment from "../../../TherapistAccount/Appointments/New";
import AppointmentDetails from "../../../TherapistAccount/Appointments/Appointment/AppointmentDetails";
import Profile from "../../../TherapistAccount/Profile";
import ConnectBankAccount from "../../../TherapistAccount/ConnectBankAccount";

export const PrivateRoutes = ({ isLoggedIn }) => (
  <>
    <Route
      exact
      path={"/availability"}
      component={isLoggedIn ? Availability : Login}
    />
    <Route
      exact
      path={"/appointments"}
      component={isLoggedIn ? Appointments : Login}
    />
    <Route
      exact
      path={"/appointments/:id"}
      component={isLoggedIn ? AppointmentDetails : Login}
    />
    <Route
      exact
      path={"/new-appointment"}
      component={isLoggedIn ? NewAppointment : Login}
    />
    <Route exact path={"/profile"} component={isLoggedIn ? Profile : Login} />
    <Route
      exact
      path={"/connect-a-bank-account"}
      component={isLoggedIn ? ConnectBankAccount : Login}
    />
  </>
);

export default PrivateRoutes;
