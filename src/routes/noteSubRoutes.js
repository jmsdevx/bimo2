import { Switch, Route } from "react-router-dom";
import React from "react";
import AllText from "../components/user/notes/AllText";
import AllNotes from "../components/user/notes/AllNotes";
import AllHomeworks from "../components/user/notes/AllHomeworks";

export default (
  <Switch>
    <Route path="/profile/notes/all" component={AllText} />
    <Route path="/profile/notes/notes" component={AllNotes} />
    <Route path="/profile/notes/homeworks" component={AllHomeworks} />
  </Switch>
);
