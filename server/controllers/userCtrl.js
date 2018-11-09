module.exports = {
  getUser: (req, res, next) => {
    // console.log(req);
    // console.log("REQ: " + req);
    console.log("user " + req.user.email);
    const email = req.user.email
    const dbInstance = req.app.get("db");
    dbInstance
      .get_user(email)
      .then(response => {
        return res.status(200).json(response);
      })

      .catch(error => {
        res.status(500).send(error);
        console.log(error);
      });
  }
};
