const errorResponsObj = require("../response/error_response");

function errorHandler(err, req, res, next) {
  console.error(err);
  if (err.code === 11000 && err.message.includes("email_1")) {
    return res.status(409).send(errorResponsObj("The User is already exists"));
  }
  if (err.code == 11000) {
    return res
      .status(409)
      .send(errorResponsObj("Directory already exist with this name"));
  }

  if (err.message.includes("ObjectId failed")) {
    return res.status(422).send(errorResponsObj("Invalid object id"));
  }
  if (err.message.includes("Invalid Email")) {
    return res
      .status(422)
      .send(errorResponsObj("No user found with this email"));
  }
  if (err.message.includes("Invalid Password")) {
    return res.status(422).send(errorResponsObj("Password Incorrect"));
  }
  next();
}
module.exports = errorHandler;
