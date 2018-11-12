import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  title: { color: "white" }
};

class AllNotes extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 className={classes.title}>All Notes</h1>
      </div>
    );
  }
}

export default withStyles(styles)(AllNotes);
