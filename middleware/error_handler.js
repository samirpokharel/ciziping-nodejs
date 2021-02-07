const errorResponsObj = require("../response/error_response");

function errorHandler(err, req, res, next) {
  console.error(err.message);
  if (err.code === 11000 && err.message.includes("email_1")) {
    res.status(409).send(errorResponsObj("The User is already exists"));
  }
  if (err.code == 11000) {
    res
      .status(409)
      .send(errorResponsObj("Directory already exist with this name"));
  }

  if (err.message.includes("ObjectId failed")) {
    res.status(422).send(errorResponsObj("Invalid object id"));
  }
  next();
}
module.exports = errorHandler;
