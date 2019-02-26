import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import writeSubRoutes from "../../../routes/writeSubRoutes";
import { Link, Redirect } from "react-router-dom";
import space from "./space.jpg";

const styles = {
  root: {
    flexGrow: 1,
    margin: "6.8vh 0px 0px 0px",
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

class Write extends React.Component {
  state = {
    value: 0,
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/profile/write/note" />;
    }
  };

  componentDidMount() {
    this.setRedirect();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.writecontainer}>
        <Paper className={classes.root}>
          <Link to="/profile/write/note">Note</Link>
          <Link to="/profile/write/homework">Homework</Link>
        </Paper>
        {writeSubRoutes}
        {this.renderRedirect()}
      </div>
    );
  }
}

export default withStyles(styles)(Write);
