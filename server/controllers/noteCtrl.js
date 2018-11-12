module.exports = {
  addNote: (req, res, next) => {
    const dbInstance = req.app.get("db");
    console.log(req.body);
    const { auth_id, note_title, note_content, note_type } = req.body;

    dbInstance
      .add_note([auth_id, note_type, note_title, note_content])
      .then(response => res.status(200).send(response))
      .catch(error => {
        res.status(500).send(error);
        console.log(error);
      });
  },

  editNote: (req, res) => {
    const { id } = req.params;
    const { note_title, note_content } = req.body;
    console.log(id, note_title, note_content);
    const dbInstance = req.app.get("db");

    dbInstance
      .edit_note([id, note_title, note_content])
      .then(response => {
        console.log(`"newArr:" ${response}`);
        res.status(200).send(response);
      })
      .catch(e => res.status(500).send(e));
  },
  getAllNotes: (req, res, next) => {
    const { id } = req.params;
    const dbInstance = req.app.get("db");
    dbInstance
      .get_all_notes(id)
      .then(response => res.status(200).json(response))
      .catch(error => {
        res.status(500).send(error);
        console.log(error);
      });
  },
  deleteNote: (req, res) => {
    const { id } = req.params;
    const dbInstance = req.app.get("db");
    const auth_id = req.body;

    dbInstance
      .delete_note([id, auth_id])
      .then(response => {
        // console.log(`"newArr:" ${response}`);
        res.status(200).send(response);
      })
      .catch(e => res.status(500).send(e));
  },
  getRecent: (req, res) => {
    const dbInstance = req.app.get("db");
    const { auth_id } = req.params;
    dbInstance
      .get_recent(`${auth_id}`)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(e => res.status(500).send(e));
  }
};
