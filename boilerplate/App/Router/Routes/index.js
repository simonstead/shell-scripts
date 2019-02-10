import React from "react";
import { Route } from "react-router-dom";

import PrivateRoutes from "./private";
import TherapistsRoutes from "./therapist";
import LandingPages from "./landingPages";

import Home from "../../../Home";
import Login from "../../../Auth/Login";
import PasswordReset from "../../../Auth/PasswordReset";
import PasswordResetConfirm from "../../../Auth/PasswordReset/Confirm";
import Register from "../../../Auth/Register";
import RegisterTherapists from "../../../Auth/RegisterTherapists";
import RegisterTherapistsConfirmPhone from "../../../Auth/RegisterTherapists/Phone";
import SetProfilePhoto from "../../../Auth/RegisterTherapists/ProfilePhoto";

import asyncWrapper from "../../Async";

const Contact = asyncWrapper(() => import("../../../Contact"));

const PublicRoutes = () => (
  <>
    <Route exact path={"/contact"} component={Contact} />
    <Route exact path={"/profile-photo"} component={SetProfilePhoto} />
  </>
);

const AuthRoutes = () => (
  <>
    <Route exact path={"/register"} component={Register} />
    <Route exact path={"/register/therapists"} component={RegisterTherapists} />
    <Route
      exact
      path={"/register/phone"}
      component={RegisterTherapistsConfirmPhone}
    />
    <Route exact path={"/login"} component={Login} />
    <Route exact path={"/password-reset"} component={PasswordReset} />
    <Route
      exact
      path={"/password-reset-confirm"}
      component={PasswordResetConfirm}
    />
  </>
);

// TODO:if not logged in, redirect

export const Routes = ({ isLoggedIn }) => (
  <>
    <AuthRoutes />
    <PublicRoutes />
    <LandingPages />
    <PrivateRoutes isLoggedIn={isLoggedIn} />
  </>
);

export default Routes;
