const { Router } = require("express");
const {
  createDirectory,
  editDirectory,
  deleteDirectory,
  getAllDirectory,
} = require("../controller/directory_controller");
const router = Router();

router.route("/").get(getAllDirectory).post(createDirectory);
router.route("/:id").put(editDirectory).delete(deleteDirectory);

module.exports = router;
