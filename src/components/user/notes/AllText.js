import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { getUser } from "../../ducks/user_reducer";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import EditNote from "./EditNote";

const styles = theme => ({
  root: {
    width: "80%",
    margin: ".5vh 0 0 10vw"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AllText extends Component {
  constructor(props) {
    super();
    this.state = { notes: [], auth_id: "", profile: [], open: false };
  }

  async componentDidMount() {
    await this.props.getUser();
    this.setProfile();
  }

  componentDidUpdate() {
    this.getAllNotes();
  }

  setProfile() {
    this.setState({ profile: this.props.state.user_reducer.user }, () =>
      this.drill()
    );
  }

  drill() {
    console.log(this.state.profile);
    this.state.profile.map((e, i) => {
      return this.setState(
        {
          auth_id: e.auth_id
        },
        () => this.getAllNotes()
      );
    });
    console.log(this.state.auth_id);
  }

  getAllNotes() {
    const auth_id = this.state.auth_id;
    axios
      .get(`/api/notes/all/${auth_id}`)
      .then(response => this.setState({ notes: response.data }))
      .catch(e => console.log(e));
  }

  deleteNote(id) {
    console.log(id);
    console.log(this.state.auth_id);
    axios
      .delete(`/api/notes/all/${id}`, { auth_id: this.state.auth_id })
      .then(response => {
        console.log(response);
        // this.setState({ notes: response.data });
      })
      .catch(error => console.log(error));
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    let notesdisplay = this.state.notes.map((e, i) => {
      return (
        <div key={e.note_id} className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.column}>
                <Typography className={classes.heading}>
                  {e.note_title}
                </Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <div className={classNames(classes.column, classes.helper)}>
                <Typography variant="caption">
                  {e.note_content.blocks.map((f, j) => f.text + " ")}
                </Typography>
              </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small" onClick={() => this.deleteNote(e.note_id)}>
                Delete
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={this.handleClickOpen}
              >
                Edit
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
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
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.flex}
                >
                  write a note
                </Typography>
              </Toolbar>
            </AppBar>
            {/* <Editor /> */}
            {console.log("map " + e.note_id)}
            <EditNote
              auth_id={this.state.auth_id}
              note_content={e.note_content}
              note_id={e.note_id}
              handleClose={this.handleClose}
              note_title={e.note_title}
            />
          </Dialog>
        </div>
      );
    });
    return <div className="notescontainer">{notesdisplay}</div>;
  }
}

AllText.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStatetoProps(state) {
  return { state };
}

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { getUser }
  )(AllText)
);
