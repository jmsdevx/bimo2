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

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1,
    alignText: "center"
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class WriteNote extends React.Component {
  state = {
    open: false
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
      <div>
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
                NOTE TITLE
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          {/* <Editor /> */}
          <Editor />
        </Dialog>
      </div>
    );
  }
}

WriteNote.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(WriteNote);
