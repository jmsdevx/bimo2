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

//basic
app.use(json());
app.use(cors());

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
// app.get("/token", callback)

//server
app.listen(port, () => console.log(`Listening on ${port}`));
