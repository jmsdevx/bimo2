import { Switch, Route } from "react-router-dom";
import React from "react";
import WriteHomework from "../components/user/write/WriteHomework";
import WriteNote from "../components/user/write/WriteNote";

export default (
  <Switch>
    <Route path="/profile/write/homework" component={WriteHomework} />
    <Route path="/profile/write/note" component={WriteNote} />
  </Switch>
);
