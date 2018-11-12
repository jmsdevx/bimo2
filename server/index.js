require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const { json } = require("body-parser");
const massive = require("massive");
const cors = require("cors");
const port = 3005;
const authCtrl = require("./controllers/authCtrl");
const { getUser } = require("./controllers/userCtrl");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const faker = require("faker");

//controllers
const {
  addNote,
  editNote,
  getAllNotes,
  deleteNote,
  getRecent
} = require("./controllers/noteCtrl");
const { getSearch } = require("./controllers/searchCtrl");

//basic
app.use(json());
app.use(cors());

//join
app.get("/api/profile/recent/:id", getRecent);

//write
app.post("/api/write/note", addNote);
app.put("/api/write/note/:id", editNote);
app.post("/api/write/homework", addNote);
app.put("/api/write/homework/:id", editNote);

//notes
app.get("/api/notes/all/:id", getAllNotes);
app.delete("/api/notes/all/:id", deleteNote);

//search
app.post("/api/search", getSearch);
// app.post("/api/search/synonyms", getSynonyms);

//sessions
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

//auth
app.use(passport.initialize());
app.use(passport.session());
authCtrl(app);

//db
massive(process.env.STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);

    // dbInstance
    //   .create_table()
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => console.log(error));
  })
  .catch(error => console.log(error));

//to ducks
app.get("/api/user", getUser);

//chat token
app.get("/token", function(req, res) {
  let identity = faker.name.findName();
  let token = new AccessToken(
    process.env.TWILIO_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_SECRET
  );

  token.identity = identity;

  const grant = new VideoGrant();
  token.addGrant(grant);

  res.send({
    identity: identity,
    token: token.toJwt()
  });
});

//server
app.listen(port, () => console.log(`Listening on ${port}`));
