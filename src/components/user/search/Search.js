import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Speech from "./Speech";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: "30vw",
    midWidth: "30vw",
    textAlign: "center",

    margin: "1vw",
    minHeight: "8vh"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  results: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    overflow: "auto"
  },
  textField: {
    color: "white",
    backgroundColor: "transparent",
    border: "3px solid #843ffb",
    borderRadius: "3%",
    height: "7vh",
    width: "20vw",
    fontSize: "2em",
    margin: "2vw 1vw 0 0"
  },
  searchbtn: {
    backgroundColor: "#08FBDE",
    color: "#FFFFF",
    transition: "100s",
    height: "7vh",
    margin: "0 1vw 1vw 0"
  },
  synbtn: {
    backgroundColor: "#843ffb",
    color: "#FFFFF",
    transition: "100s",
    height: "7vh",
    margin: "0 0 1vw 0"
  },
  cardcontainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "1vw 0 0 2.5vw",
    justifyContent: "center"
  }
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      type: "regions=us",
      results: [],
      defs: [],
      lexCat: [],
      speech: [[{ audioFile: "none" }]],
      text: "",
      check: false,
      synresults: [],
      synonyms: [],
      synLexCat: [],
      antresults: [],
      antonyms: [],
      cardobject: [],
      searchType: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { input, type } = this.state;
    console.log(input);
    if (type === "regions=us") {
      await axios
        .post("/api/search", {
          input: input,
          type: type
        })
        .then(response =>
          this.setState({
            results: response.data,
            check: false,
            searchType: "defs"
          })
        )
        .catch(e => console.log(e));
      this.drilldefs();
    }
  };

  drilldefs = () => {
    let speech = this.state.results.map((e, i) => {
      return e.pronunciations
        ? e.pronunciations.filter(f => {
            return f.audioFile;
          })
        : this.state.speech;
    });
    let cardobject = [];
    for (let i = 0; i < this.state.results.length; i++) {
      this.state.results[i].entries.map((f, j) => {
        return f.senses.map((g, k) => {
          let final = {};
          final[this.state.results[i].lexicalCategory] =
            g.definitions || g.short_definitions;
          return cardobject.push(final);
        });
      });
    }
    this.setState({
      cardobject: cardobject,
      check: !this.state.check,
      speech: speech
    });
  };

  handleThesaurus = async () => {
    await axios
      .post("/api/search/synonyms", {
        input: this.state.input
      })
      .then(response =>
        this.setState({
          synresults: response.data[0].entries[0].senses[0].synonyms,
          searchType: "syns"
        })
      )
      .catch(e => console.log(e));
  };

  speechDisplay() {
    console.log(this.state.speech[0][0].audioFile);
    return <Speech speech={this.state.speech[0][0].audioFile} />;
  }

  render() {
    const { classes } = this.props;
    let cardFactory = this.state.cardobject.map((e, i) => {
      return Object.values(e) !== typeof undefined ? (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {Object.keys(e)}
            </Typography>
            <Typography component="p">{Object.values(e)}</Typography>
          </CardContent>
        </Card>
      ) : null;
    });

    let syndisplay = this.state.synresults.map((e, i) => {
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {e.text}
            </Typography>
          </CardContent>
        </Card>
      );
    });

    return (
      <div id="searchcontainer">
        <form onSubmit={this.handleSubmit} className="searchForm" />
        <div id="searchbar">
          <div>
            <label htmlFor="search" />
            <input
              id="input"
              label="search"
              type="input"
              className={classes.textField}
              autoFocus
              onChange={this.handleChange}
              placeholder="search..."
            />
            <Button className={classes.searchbtn} onClick={this.handleSubmit}>
              Search
            </Button>
            <Button className={classes.synbtn} onClick={this.handleThesaurus}>
              Synonyms
            </Button>
          </div>

          {this.state.check ? (
            <Speech speech={this.state.speech[0][0].audioFile} />
          ) : null}
        </div>
        <div className={classes.results}>
          <div className={classes.cardcontainer}>
            {this.state.searchType === "defs" ? cardFactory : syndisplay}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
