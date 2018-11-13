import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import ProfileSplash from "./ProfileSplash";
import { connect } from "react-redux";
import { getUser } from "../../../ducks/user_reducer";
import ponder from "./ponder.png";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import Zoom from "@material-ui/core/Zoom";

const styles = {
  card: {
    width: "100vw",
    height: "10vh"
  },
  content: {
    margin: "0vh 0px 0px 0px"
  },
  title: {
    fontSize: 25
  },
  pos: {
    marginBottom: 12
  },
  gridList: {
    display: "flex",
    overflow: "hidden",
    flexDirection: "column"
  },
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
    this.setProfile();
  }

  setProfile() {
    this.setState({ profile: this.props.state.user_reducer.user }, () =>
      this.drill()
    );
  }

  drill() {
    console.log(this.state.profile);
    this.state.profile.map((e, i) => {
      return this.setState({
        f_name: e.f_name,
        l_name: e.l_name,
        email: e.email
      });
    });
    console.log(this.state.auth_id);
  }

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    return (
      <div className={classes.background}>
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
          <Switch
            checked={checked}
            color="primary"
            onChange={this.handleChange}
            aria-label="Collapse"
          />
          <Zoom in={checked} style={{ transitionDelay: checked ? 750 : 0 }}>
            <h1 id="what">What will you build...</h1>
          </Zoom>
          <Zoom in={checked} style={{ transitionDelay: checked ? 1500 : 0 }}>
            <h1 id="yourname">{this.state.f_name}?</h1>
          </Zoom>
        </div>
        {/* <div className={classes.gridList}>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Name
              </Typography>
              <Typography variant="h4" component="h2">
                {this.state.f_name || "Albus Dumbledore"}
                <br />
                {this.state.l_name || ""}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Location
              </Typography>
              <Typography variant="h4" component="h2">
                {this.state.city || "Hogsmeade Village"}
                <br />
                {this.state.Country || ""}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Email
              </Typography>
              <Typography variant="h4" component="h2">
                {this.state.email || "Dumbledong@hog.com"}
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Language
              </Typography>
              <Typography variant="h4" component="h2">
                {this.state.language || "Toad Grumbling"}
              </Typography>
            </CardContent>
          </Card> */}
        {/* </div> */}
      </div>
    );
  }
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStatetoProps(state) {
  return { state };
}

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { getUser }
  )(MyProfile)
);
