const axios = require("axios");

module.exports = {
  getSearch: (req, res) => {
    const { input, type } = req.body;
    axios
      .get(
        `https://od-api.oxforddictionaries.com/api/v1/entries/en/${input}/${type}`,
        {
          headers: {
            app_id: `${process.env.OXFORD_ID}`,
            app_key: `${process.env.OXFORD_KEY}`
            // "Content-Type": "application/json",
            // Accept: "application/json"
          }
        }
      )
      .then(response =>
        res.status(200).send(response.data.results[0].lexicalEntries)
      )
      .catch(e => {
        console.log(e);
        return res.status(404).send("404");
      });
  },
  getSynonyms: (req, res) => {
    const { input } = req.body;
    axios
      .get(
        `https://od-api.oxforddictionaries.com/api/v1/entries/en/${input}/synonyms`,
        {
          headers: {
            app_id: `${process.env.OXFORD_ID}`,
            app_key: `${process.env.OXFORD_KEY}`
            // "Content-Type": "application/json",
            // Accept: "application/json"
          }
        }
      )
      .then(response =>
        res.status(200).send(response.data.results[0].lexicalEntries)
      )
      .catch(e => {
        console.log(e);
        return res.status(404).send("404");
      });
  }
};
