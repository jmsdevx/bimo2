import { Switch, Route } from "react-router-dom";
import React from "react";

import Landing from "../components/layout/landing/Landing";
import Profile from "../components/user/profile/Profile";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/profile" component={Profile} />
  </Switch>
);
