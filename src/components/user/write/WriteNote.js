import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Editor from "../../editor/pads/Editor";
import space from "./space.jpg";
import { connect } from "react-redux";
import { getUser } from "../../ducks/user_reducer";
import popsicle from "../profile/user_data/popsicle_adventure_1.png";

const styles = {
  appBar: {
    position: "relative"
  },
  background: {
    backgroundImage: `url(${popsicle})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "1"
  },
  flex: {
    flex: 1,
    alignText: "center"
  },
  buttonContainer: {
    background: "#08FBDE",
    opacity: "1",
    margin: "82.5vh 0 0 0 "
  },
  dialogback: {
    backgroundImage: `url(${space})`
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class WriteNote extends React.Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      profile: [],
      auth_id: ""
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
        auth_id: e.auth_id
      });
    });
    console.log(this.state.auth_id);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <Button
          className={classes.buttonContainer}
          onClick={this.handleClickOpen}
          fullWidth={true}
        >
          Create New Note
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          className={classes.dialogback}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                write a note
              </Typography>
            </Toolbar>
          </AppBar>
          {/* <Editor /> */}
          <Editor auth_id={this.state.auth_id} handleClose={this.handleClose} />
        </Dialog>
      </div>
    );
  }
}

WriteNote.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStatetoProps(state) {
  return { state };
}

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { getUser }
  )(WriteNote)
);
