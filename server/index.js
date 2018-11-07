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

app.use(json());
app.use(cors());
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
app.use(passport.initialize());
app.use(passport.session());
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

// app.get("/token", function(req, res) {
//     let identity = faker.name.findName();

//     let token = new AccessToken(
//       process.env.TWILIO_SID,
//       process.env.TWILIO_API_KEY,
//       process.env.TWILIO_SECRET
//     );

//     token.identity = identity;

//     const grant = new VideoGrant();
//     token.addGrant(grant);

//     res.send({
//       identity: identity,
//       token: token.toJwt()
//     });
//   });

authCtrl(app);

app.listen(port, () => console.log(`Listening on ${port}`));
