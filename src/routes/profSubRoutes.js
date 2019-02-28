import React from "react";
import { Switch, Route } from "react-router-dom";
import MyProfile from "../components/user/profile/user_data/MyProfile";
import Write from "../components/user/write/Write";
import Chat from "../components/user/chat/Chat";
import Search from "../components/user/search/Search";

export default (
  <Switch>
    <Route path="/profile/myprofile" component={MyProfile} />
    <Route path="/profile/write" component={Write} />
    <Route path="/profile/chat" component={Chat} />
    <Route path="/profile/search" component={Search} />
  </Switch>
);
