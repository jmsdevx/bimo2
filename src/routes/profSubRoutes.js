import { Switch, Route } from "react-router-dom";
import React from "react";
import MyProfile from "../components/user/profile/user_data/MyProfile";
import Write from "../components/user/write/Write";
// import AllText from "../components/user/notes/AllText";
// import Vocabulary from "../components/user/vocabulary/Vocabulary";
import Chat from "../components/user/chat/Chat";
import Search from "../components/user/search/Search";

export default (
  <Switch>
    <Route path="/profile/myprofile" component={MyProfile} />
    <Route path="/profile/write" component={Write} />
    {/* <Route path="/profile/text" component={AllText} /> */}
    {/* <Route path="/profile/vocabulary" component={Vocabulary} /> */}
    <Route path="/profile/chat" component={Chat} />
    <Route path="/profile/search" component={Search} />
  </Switch>
);
