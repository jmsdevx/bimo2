require("dotenv").config();
const passport = require("passport");
const AuthStrategy = require("passport-auth0");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new AuthStrategy(
      {
        domain: process.env.DOMAIN,
        clientID: process.env.CLIENT_ID, // <---- potential casing error
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/login", // <---- potential casing error
        scope: "openid email profile"
      },
      (authToken, refreshToken, extraParams, profile, done) =>
        done(null, profile)
    )
  );

  passport.serializeUser((profile, done) => {
    console.log(profile._json);
    const db = app.get("db");
    db.get_authid(profile.id).then(user => {
      if (!user[0]) {
        db.add_authid([
          profile.id,
          profile.name.givenName,
          profile.name.familyName,
          profile._json.email
        ])
          .then(response => {
            console.log(response);
            return done(null, response[0]);
          })
          .catch(err => console.log(err));
      } else {
        return done(null, user[0]);
      }
    });
  });

  passport.deserializeUser((profile, done) => done(null, profile));

  app.get(
    "/login",
    passport.authenticate("auth0", {
      successRedirect: `${process.env.REACT_APP_CLIENT}/profile`,
      failureRedirect: "/"
    })
  );

  // app.get("/success", (req, res) => {
  //   res.status(200).json(req.user);
  // });
};
