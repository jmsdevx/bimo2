import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FaceIcon from "@material-ui/icons/Face";
import TranslateIcon from "@material-ui/icons/Translate";
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
    {/* <Link to="/profile/vocabulary">
      <ListItem button>
        <ListItemIcon>
          <TranslateIcon />
        </ListItemIcon>
        <ListItemText primary="Vocabulary" />
      </ListItem>
    </Link> */}
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

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Recently Saved</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Homework 5.5" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Ch. 5 Notes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Crazy Dream" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Lecture 11/11" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Friday Chat" />
    </ListItem>
  </div>
);
