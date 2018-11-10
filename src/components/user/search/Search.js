import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Speech from "./Speech";
import { callbackify } from "util";

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
    let defs = this.state.results.map((e, i) => {
      return e.entries.map((f, j) => {
        return f.senses.map((g, k) => {
          return g.definitions || g.short_definitions;
        });
      });
    });
    let lexCat = this.state.results.map((e, i) => {
      return e.lexicalCategory;
    });
    let speech = this.state.results.map((e, i) => {
      return e.pronunciations
        ? e.pronunciations.filter(f => {
            return f.audioFile;
          })
        : this.state.speech;
    });
    let text = this.state.results.map((e, i) => {
      return e.text;
    });
    this.setState(
      {
        defs: defs,
        lexCat: lexCat,
        speech: speech,
        text: text,
        check: !this.state.check
      }
      // () => this.cardObject(this.cardClosure)
      // () => this.cardClosure(this.cardObject)
    );
  }

  // cardObject() {
  //   const { lexCat, defs } = this.state;
  //   for (let i = 0; i < lexCat.length; i++) {
  //     defs.map((f, j) => {
  //       return [lexCat[i]] + " " + f;
  //     });
  //   }
  // }

  // cardClosure(callback) {
  //   let cardobject = callback();
  //   this.setState({ cardobject: cardobject });
  //   console.log(this.state.cardobject);
  // }

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
    let lexCatDisplay = this.state.lexCat.map((e, i) => {
      return (
        <div className="lexCat" key={i}>
          <h1>{e}</h1>
        </div>
      );
    });

    let defsDisplay = this.state.defs.map((e, i) => {
      return e.map((f, j) => {
        return f.map((g, k) => {
          return (
            <div className="defs" key={k}>
              <h3>
                {k + 1}. {g}
              </h3>
            </div>
          );
        });
      });
    });

    return (
      <div className="searchcontainer">
        <div className="searchformbox">
          <form onSubmit={this.handleSubmit} className="searchForm" />
          <div className="searchbar">
            <label htmlFor="search" />
            <input
              type="input"
              className="input"
              id="input"
              placeholder="search..."
              onChange={this.handleChange}
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
            <Button className="submitbtn" onClick={this.handleSubmit}>
              Search
            </Button>
            <Button onClick={this.handleThesaurus}>Thesaurus</Button>
          </div>
        </div>
        <div className="searchResults">
          <div>{lexCatDisplay}</div>
          <div>{defsDisplay}</div>
          {this.state.check ? (
            <Speech speech={this.state.speech[0][0].audioFile} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Search;
