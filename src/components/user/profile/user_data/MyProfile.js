import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/user_reducer";
import ponder from "./ponder.png";
import Zoom from "@material-ui/core/Zoom";

const styles = {
  background: {
    backgroundImage: `url(${ponder})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    width: "90vw",
    opacity: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }
};

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      auth_id: "",
      f_name: "",
      l_name: "",
      email: "",
      country: "",
      language: "",
      age: "",
      check: false
    };
  }

  async componentDidMount() {
    await this.props.getUser();
    this.drill();
  }

  drill() {
    console.log(this.state.profile);
    this.props.state.user_reducer.user.map((e, i) => {
      return this.setState({
        f_name: e.f_name,
        l_name: e.l_name,
        email: e.email
      });
    });
  }

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    return (
      <div className={classes.background} onClick={this.handleChange}>
        <Zoom in={!checked} style={{ transitionDelay: !checked ? 500 : 0 }}>
          <h1 id="get">The secret of getting ahead</h1>
        </Zoom>
        <Zoom in={!checked} style={{ transitionDelay: !checked ? 1300 : 0 }}>
          <h1 id="start">is getting started.</h1>
        </Zoom>
        <div>
          <br />
          <br />
          <Zoom in={!checked} style={{ transitionDelay: !checked ? 2200 : 0 }}>
            <h1 id="name">-Mark Twain</h1>
          </Zoom>
          <Zoom in={checked} style={{ transitionDelay: checked ? 750 : 0 }}>
            <h1 id="what">What will you build...</h1>
          </Zoom>
          <Zoom in={checked} style={{ transitionDelay: checked ? 1500 : 0 }}>
            <h1 id="yourname">{this.state.f_name}?</h1>
          </Zoom>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return { state };
}

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { getUser }
  )(MyProfile)
);
