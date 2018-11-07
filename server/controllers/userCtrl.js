module.exports = {

    getUser: (req, res, next) => {
        const auth_id = req.user.user_id
        const dbInstance = req.app.get("db");
        dbInstance
          .get_user(auth_id)
          .then(response => res.status(200).json(response))
          .catch(error => {
            res.status(500).send(error);
            console.log(error);
          });
      }
}