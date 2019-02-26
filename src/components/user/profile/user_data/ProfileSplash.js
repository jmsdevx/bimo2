import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ponder from "./ponder.png";

const styles = {
  brain: {
    backgroundImage: `url(${ponder})`,
    height: "80vh",
    opacity: "1"
  }
};

function MyProfile(props) {
  const { classes } = props;
  return <div className={classes.brain} />;
}

export default withStyles(styles)(MyProfile);
