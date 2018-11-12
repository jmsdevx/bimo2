import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import noteSubRoutes from "../../../routes/noteSubRoutes";
import { Link } from "react-router-dom";
import space from "../write/space.jpg";

const styles = {
  root: {
    flexGrow: 1,
    margin: "7vh 0px 0px 0px",
    display: "flex",
    justifyContent: "space-evenly",
    fontSize: "1.7em"
  },
  writecontainer: {
    width: "100%",
    height: "100%",
    backgroundImage: `url(${space})`
  }
};

class Notes extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.writecontainer}>
        <Paper className={classes.root}>
          {/* <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          > */}
          <Link to="/profile/notes/all">
            All
            {/* <Tab textColor="secondary" label="Note" /> */}
          </Link>
          <Link to="/profile/notes/notes">
            Notes
            {/* <Tab label="Homework" /> */}
          </Link>
          <Link to="/profile/notes/homeworks">
            Homeworks
            {/* <Tab label="Homework" /> */}
          </Link>
          {/* </Tabs> */}
        </Paper>
        {noteSubRoutes}
      </div>
    );
  }
}

Notes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notes);