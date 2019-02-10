import React from "react";
import { Route } from "react-router-dom";
import asyncWrapper from "../../Async";

const TherapistLandingPage = asyncWrapper(() =>
  import("../../../LandingPages/Therapist")
);
const ClientLandingPage = asyncWrapper(() =>
  import("../../../LandingPages/Client")
);

export const LandingPages = () => (
  <>
    <Route
      exact
      path={"/become-a-therapist"}
      component={TherapistLandingPage}
    />
    <Route exact path={"/"} component={ClientLandingPage} />
  </>
);

export default LandingPages;
