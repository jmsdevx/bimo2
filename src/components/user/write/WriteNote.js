import React, { Component } from "react";
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
import AllText from "../notes/AllText";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";

const styles = {
  appBar: {
    position: "relative"
  },
  background: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  flex: {
    flex: 1,
    alignText: "center"
  },
  buttonContainer: {
    background: "#08FBDE",
    opacity: "1",
    margin: "0.5vw",
    alignSelf: "center"
  },
  dialogback: {
    backgroundImage: `url(${space})`
  },
  notescontainer: {
    height: "78vh",
    overflow: "auto"
  },
  add: {
    height: "2vw",
    width: "2vw"
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class WriteNote extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      profile: [],
      auth_id: "",
      notes: []
    };
  }

  async componentDidMount() {
    await this.props.getUser();
    this.getAllNotes();
  }

  getAllNotes = () => {
    const auth_id = this.props.state.user_reducer.user[0].auth_id;
    if (this.props.type === "note") {
      axios
        .get(`/api/notes/all/${auth_id}`)
        .then(response => this.setState({ notes: response.data }))
        .catch(e => console.log(e));
    } else {
      axios
        .get(`/api/notes/all/${auth_id}`)
        .then(response => this.setState({ notes: response.data }))
        .catch(e => console.log(e));
    }
  };

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
          variant="fab"
        >
          <AddIcon color="action" className={classes.add} />
        </Button>
        <div className={classes.notescontainer}>
          <AllText type="note" notes={this.state.notes} />
        </div>
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
                Note
              </Typography>
            </Toolbar>
          </AppBar>
          {this.props.state.user_reducer.user[0] && (
            <Editor
              auth_id={this.props.state.user_reducer.user[0].auth_id}
              handleClose={this.handleClose}
              getAllNotes={this.getAllNotes}
            />
          )}
        </Dialog>
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
  )(WriteNote)
);
