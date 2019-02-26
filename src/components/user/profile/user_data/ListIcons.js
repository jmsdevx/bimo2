import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FaceIcon from "@material-ui/icons/Face";
import SchoolIcon from "@material-ui/icons/School";
import VoiceChatIcon from "@material-ui/icons/VoiceChat";
import CreateIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link to="/profile/myprofile">
      <ListItem button>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
    <Link to="/profile/write">
      <ListItem button>
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText primary="Write" />
      </ListItem>
    </Link>
    <Link to="/profile/notes">
      <ListItem button>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Notes" />
      </ListItem>
    </Link>
    <Link to="/profile/chat">
      <ListItem button>
        <ListItemIcon>
          <VoiceChatIcon />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItem>
    </Link>
    <Link to="/profile/search">
      <ListItem button>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItem>
    </Link>
  </div>
);
