const errorResponsObj = require("../response/error_response");

function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.code === 11000) {
    res.status(409).send(errorResponsObj("The User is already exists"));
  }
  next();
}
module.exports = errorHandler;
