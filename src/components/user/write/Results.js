import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import ErrorTable from "./ErrorTable";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
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

  //   componentDidMount() {
  //     this.getHomework();
  //   }

  async getHomework() {
    console.log(this.props.note_id);
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
    console.log(this.state.homework[0]);
    let alltext = this.state.homework[0].note_content.blocks.map(
      (e, i) => e.text
    );
    let newtext = alltext.join(" ");
    this.setState({ content: newtext, check: !this.state.check }, () =>
      this.getResults()
    );
  }

  getResults() {
    console.log(this.state.content);
    axios
      .post(
        `https://api.textgears.com/check.php?text=${this.state.content}?&key=${
          process.env.TG_KEY
        }`
      )
      .then(
        response => {
          console.log(response.data);
          this.setState({ errors: response.data });
        }
        // , () => this.highlight())
      );
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.getHomework();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.resultsContainer}>
        <Typography gutterBottom>
          Click to see your spelling and grammar mistakes.
        </Typography>
        <Button color="primary" onClick={this.handleOpen}>
          SpellCheck
        </Button>
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
            <ErrorTable />

            <ResultsModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

Results.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const ResultsModalWrapped = withStyles(styles)(Results);

export default ResultsModalWrapped;
