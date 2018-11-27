import React, { Component } from "react";
import create from "./create.png";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import FingerprintIcon from "@material-ui/icons/Fingerprint";

const styles = {
  switch: {
    position: "absolute",
    zIndex: "0",
    margin: "51.7vh 0 0 65.6vw"
  },
  print: {
    position: "absolute",
    zIndex: "0",
    margin: "65vh 0 0 87vw",
    color: "white",
    height: "20vh",
    width: "10vw"
  }
};

class SplashImage extends Component {
  constructor(props) {
    super();
    this.state = { checked: false };
  }

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    return (
      <div>
        <Switch
          checked={checked}
          onChange={this.handleChange}
          aria-label="Collapse"
          className={classes.switch}
        />
        <FingerprintIcon
          className={classes.print}
          onClick={this.handleChange}
          color="white"
          id="fingerprint"
        />
        <div className="splashinfo">
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 500 } : null)}
          >
            <span className="infocolor write">
              <h1>write.</h1>
            </span>
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 1000 } : null)}
          >
            <span className="infocolor save">
              <h1>save.</h1>
            </span>
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 1500 } : null)}
          >
            <span className="infocolor chat">
              <h1>chat.</h1>
            </span>
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 2000 } : null)}
          >
            <span className="infocolor search">
              <h1>search.</h1>
            </span>
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(true ? { timeout: 2500 } : null)}
          >
            <span className="infocolor learn">
              <h1>learn.</h1>
            </span>
          </Grow>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SplashImage);
