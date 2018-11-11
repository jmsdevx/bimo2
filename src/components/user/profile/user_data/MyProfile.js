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

const styles = {
  card: {
    minWidth: 300,
    minHeight: "20vh",
    width: "10vw"
  },
  content: {
    margin: "7vh 0px 0px 0px"
  },
  title: {
    fontSize: 25
  },
  pos: {
    marginBottom: 12
  },
  gridList: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    overflow: "hidden"
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
      age: ""
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
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            {this.state.profile !== [] ? (
              <ProfileSplash f_name={this.state.f_name} />
            ) : (
              <h1>Loading!</h1>
            )}
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
            {/*make subroutes here*/}
          </Typography>
        </main>
        <GridList
          container
          direction="row"
          justify="space-around"
          alignItems="stretch"
          className="classes.gridlist"
        >
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
          </Card>
        </GridList>
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
