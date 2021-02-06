const asyncMiddleware = require("../middleware/async_middleware");
const { User, validateUser } = require("../models/User");
const authSucessResponse = require("../response/auth_sucess_response");
const errorResponsObj = require("../response/error_response");

module.exports.login = asyncMiddleware(async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(422).send(errorResponsObj(error.message));
  const { email, password } = req.body;
  const user = await User.login(email, password);
  const token = await user.generateJWT(user);
  res.send(authSucessResponse(user, token));
});

module.exports.register = asyncMiddleware(async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(422).send(errorResponsObj(error.message));
  const user = await User.create(req.body);
  const token = await user.generateJWT(user);
  res.send(authSucessResponse(user, token));
});
