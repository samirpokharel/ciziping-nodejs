const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const errorResponsObj = require("../response/error_response");
const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .send(errorResponsObj("Access denied. No token provided."));
  try {
    const decoded = jwt.verify(token, process.env.API_KEY);
    req.user = decoded;
    const user = await User.findById(decoded.id);
    if (!user)
      return res
        .status(400)
        .send(errorResponsObj("Request failed Invalid Token"));
  } catch (ex) {
    return res.status(400).send(errorResponsObj("Invalid Token"));
  }
  next();
};

module.exports = auth;
