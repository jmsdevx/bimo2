import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {
    flexGrow: 1,
    fontSize: "1.7em"
  },
  login: {
    color: "white"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
};

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h4" color="inherit">
            bimo
          </Typography>
          <Typography variant="h5" color="inherit">
            English eLearning
          </Typography>
          <a
            className={classes.login}
            href={`${process.env.REACT_APP_SERVER}/login`}
          >
            Login
          </a>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(NavBar);
