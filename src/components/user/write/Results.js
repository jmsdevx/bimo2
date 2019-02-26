import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ErrorTable from "./ErrorTable";
import Paper from "@material-ui/core/Paper";

function getModalStyle() {
  const top = 20;
  const left = 12;

  return {
    top: `${top}%`,
    left: `${left}%`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 150,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  resultsContainer: {
    textAlign: "center",
    margin: "10vh 0 0 0"
  },
  spellcheck: {
    elevation: 1,
    backgroundColor: theme.palette.secondary.main
  }
});

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      homework: [],
      content: "",
      errors: {
        errors: [{ bad: "Loading!" }, { type: "" }, { better: [""] }]
      },
      suggestion: ""
    };
  }

  async getHomework() {
    await axios
      .get(`/api/write/results/${this.props.note_id}`)
      .then(response => {
        console.log(response);
        return this.setState({ homework: response.data });
      })
      .catch(e => console.log(e));
    this.drill();
  }

  drill() {
    let alltext = this.state.homework[0].note_content.blocks.map(
      (e, i) => e.text
    );
    let newtext = alltext.join(" ");
    this.setState({ content: newtext, check: !this.state.check }, () =>
      this.getResults()
    );
  }

  getResults() {
    axios
      .post(
        `https://api.textgears.com/check.php?text=${this.state.content}?&key=${
          process.env.TG_KEY
        }`
      )
      .then(response => {
        this.setState({ errors: response.data });
      });
  }

  handleOpen = () => {
    if (this.props.check) {
      this.getHomework();
      this.setState({ open: true });
    } else {
      alert("Please save your work!");
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.resultsContainer}>
        <Paper className={classes.spellcheck}>
          <Typography gutterBottom>
            Click to see your spelling and grammar mistakes.
          </Typography>
          <Button color="primary" onClick={this.handleOpen}>
            SpellCheck
          </Button>
        </Paper>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Errors:
            </Typography>
            <Typography variant="p">{this.state.content}</Typography>
            <ErrorTable errors={this.state.errors} />
          </div>
        </Modal>
      </div>
    );
  }
}

const ResultsModalWrapped = withStyles(styles)(Results);

export default ResultsModalWrapped;
