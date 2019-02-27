import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grow from "@material-ui/core/Grow";
import FingerprintIcon from "@material-ui/icons/Fingerprint";

const styles = {
  switch: {
    position: "absolute",
    zIndex: "0",
    margin: "52.6vh 0 0 65.7vw"
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
  constructor() {
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
