const { Router } = require("express");
const auth = require("../middleware/auth_middleware");
const {
  createDirectory,
  editDirectory,
  deleteDirectory,
  getAllDirectory,
  createNote,
  deleteNote,
  getAllNotes,
  //   updateNote,
} = require("../controller/directory_controller");
const router = Router();

router.route("/").get(auth, getAllDirectory).post(auth, createDirectory);
router.route("/:did").put(auth, editDirectory).delete(auth, deleteDirectory);
router.route("/:did/notes").post(auth, createNote).get(auth, getAllNotes);

router.route("/:did/notes/:nid").delete(auth, deleteNote);
// .put(updateNote);

module.exports = router;
