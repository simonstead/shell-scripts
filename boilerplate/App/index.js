import React from "react";
import AppContainer from "./Provider";
import Router from "./Router";
import Analytics from "./Analytics";

const App = () => (
  <AppContainer>
    <Router />
  </AppContainer>
);

export default App;
