const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
async function getCurrentUser(req, res, next) {
  const token = req.header("x-auth-token");
  const decoded = jwt.verify(token, process.env.API_KEY);
  const user = await User.findById(decoded.id).select("_id fullName email");
  res.send({
    sucess: true,
    user,
  });
}

module.exports = getCurrentUser;
