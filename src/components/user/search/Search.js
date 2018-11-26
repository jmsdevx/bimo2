import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Speech from "./Speech";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { transparent } from "material-ui/styles/colors";
import { isWidthDown } from "@material-ui/core/withWidth";

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
    alignItems: "stretch"
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
      cardobject: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.speechDisplay = this.speechDisplay.bind(this);
    this.handleThesaurus = this.handleThesaurus.bind(this);
    // this.cardClosure = this.cardClosure.bind(this);
    // this.cardObject = this.cardObject.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  async handleSubmit(e) {
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
          this.setState(
            { results: response.data, input: "", check: false },
            () => console.log(this.state.results)
          )
        )
        .catch(e => console.log(e));
      this.drilldefs();
    }
  }

  drilldefs() {
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
    console.log(this.state.cardobject);
  }

  async handleThesaurus() {
    await axios
      .post("http://localhost:3005/api/search/synonyms", {
        input: this.state.text[0]
      })
      .then(response =>
        this.setState({ synresults: response.data }, () =>
          console.log(this.state.synresults)
        )
      )
      .catch(e => console.log(e));
    this.drillSynonyms();
  }

  drillSynonyms() {
    let synLexCat = this.state.results.map((e, i) => {
      return e.lexicalCategory;
    });
    let syns = this.state.synresults.map((ele, ind) => {
      return ele.entries.map((e, i) => {
        return e.senses.map((f, j) => {
          return f.subsenses
            ? f.subsenses.map((g, k) => {
                return g.synonyms.map((element, index) => {
                  return element.text;
                });
              })
            : f.synonyms;
        });
      });
    });
    this.setState({ synonyms: syns, synLexCat: synLexCat }, () =>
      console.log(this.state.synonyms)
    );
  }

  speechDisplay() {
    console.log(this.state.speech[0][0].audioFile);
    return <Speech speech={this.state.speech[0][0].audioFile} />;
  }
  render() {
    const { classes } = this.props;
    let cardFactory = this.state.cardobject.map((e, i) => {
      // return console.log(Object.keys(e));
      // return console.log(Object.values(e));
      return Object.values(e) !== typeof undefined ? (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {Object.keys(e)}
            </Typography>
            <Typography component="p">{Object.values(e)}</Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Save</Button>
          </CardActions> */}
        </Card>
      ) : null;
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
            {/* <select
              name="type"
              id="type"
              defaultValue="regions=us"
              onChange={this.handleChange}
            >
              <option value="regions=us">Dictionary</option>
              <option value="synonyms">Synonyms</option>
              <option value="antonyms">Antonyms</option>
              <option value="sentences">Sentences</option>
            </select> */}
            <Button className={classes.searchbtn} onClick={this.handleSubmit}>
              Search
            </Button>
          </div>
          {/* <Button onClick={this.handleThesaurus}>Thesaurus</Button> */}
          {this.state.check ? (
            <Speech speech={this.state.speech[0][0].audioFile} />
          ) : null}
        </div>
        <div className={classes.results}>
          {/* <div>{lexCatDisplay}</div>
          <div>{defsDisplay}</div> */}
          <div className={classes.cardcontainer}>{cardFactory}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Search);

// drilldefs() {
//   let defs = this.state.results.map((e, i) => {
//     return e.entries.map((f, j) => {
//       return f.senses.map((g, k) => {
//         return g.definitions || g.short_definitions;
//       });
//     });
//   });
//   let lexCat = this.state.results.map((e, i) => {
//     return e.lexicalCategory;
//   });

//   let text = this.state.results.map((e, i) => {
//     return e.text;
//   });
//   this.setState(
//     {
//       defs: defs,
//       lexCat: lexCat,
//       speech: speech,
//       text: text,
//       check: !this.state.check
//     }
//     // () => this.cardObject(this.cardClosure)
//     // () => this.cardClosure(this.cardObject)
//   );
// }

// let lexCatDisplay = this.state.lexCat.map((e, i) => {
//   return (
//     <div className="lexCat" key={i}>
//       <h1>{e}</h1>
//     </div>
//   );
// });

// let defsDisplay = this.state.defs.map((e, i) => {
//   return e.map((f, j) => {
//     return f.map((g, k) => {
//       return (
//         <div className="defs" key={k}>
//           <h3>
//             {k + 1}. {g}
//           </h3>
//         </div>
//       );
//     });
//   });
// });
