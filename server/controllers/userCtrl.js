module.exports = {
  getUser: (req, res, next) => {
    // console.log(req);
    console.log("REQ: " + req);
    // console.log(req.sessions.passport);
    const dbInstance = req.app.get("db");
    dbInstance
      .get_user()
      .then(response => {
        console.log(response.data);
        return res.status(200).json(response);
      })
      .catch(error => {
        res.status(500).send(error);
        console.log(error);
      });
  }
};
