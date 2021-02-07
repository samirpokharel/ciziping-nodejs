const { Router } = require("express");
const auth = require("../middleware/auth_middleware");
const {
  createDirectory,
  editDirectory,
  deleteDirectory,
  getAllDirectory,
  createNote,
  deleteNote,
  //   updateNote,
} = require("../controller/directory_controller");
const router = Router();

router.route("/").get(auth, getAllDirectory).post(auth, createDirectory);
router.route("/:did").put(auth, editDirectory).delete(auth, deleteDirectory);
router.route("/:did/notes").post(auth, createNote);

router.route("/:did/notes/:nid").delete(auth, deleteNote);
// .put(updateNote);

module.exports = router;
