import React, { Component } from "react";
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

const styles = theme => ({
  root: {
    width: "80%",
    height: "100%",
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
  },
  edit_field: {
    width: "50vw"
  }
});

class AllText extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      auth_id: "",
      profile: [],
      edit_content: "",
      editing: false
    };
  }

  componentDidMount() {
    this.props.getUser();
  }

  deleteNote(id) {
    console.log(id);
    console.log(this.state.auth_id);
    axios
      .delete(`/api/notes/all/${id}`, { auth_id: this.state.auth_id })
      .then(response => {
        this.props.getAllNotes();
        // this.setState({ notes: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    const { classes } = this.props;
    let notesdisplay = this.props.notes.map((e, i) => {
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
                <Typography>
                  {e.note_content.blocks.map((f, j) => f.text + " ")}
                </Typography>
              </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small" onClick={() => this.deleteNote(e.note_id)}>
                Delete
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </div>
      );
    });
    return <div className="notescontainer">{notesdisplay}</div>;
  }
}

function mapStatetoProps(state) {
  return { state };
}

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { getUser }
  )(AllText)
);
