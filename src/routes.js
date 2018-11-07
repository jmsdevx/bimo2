import { Switch, Route } from "react-router-dom";
import React from "react";

import Landing from "./components/layout/landing/Landing";
import Profile from "./components/user/profile/Profile";
import Write from "./components/user/notes/Write";
import Results from "./components/user/notes/Results";
import Search from "./components/user/search/Search";
import Chat from "./components/user/chat/Chat";

export default (
  <Switch>
    <Route exact path="/" component={Landing} /> 
    <Route path="/profile/:auth_id" component={Profile} />
    <Route path="/write/homework" component={Write} />
    <Route path="/write/homework/results/:id" component={Results} />
    <Route path="/write/note" component={Write} />
    <Route path="/search" component={Search} />
    <Route path="/chat" component={Chat} />
  </Switch>
);
