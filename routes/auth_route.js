const { Router } = require("express");
const { login, register } = require("../controller/auth_controller");
const auth = require("../middleware/auth_middleware");
const getCurrentUser = require("../middleware/get_current_user");
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/current", auth, getCurrentUser);

module.exports = router;
