const asyncMiddleware = require("../middleware/async_middleware");
const { validateDirectory, Directory } = require("../models/Directory");
const errorResponsObj = require("../response/error_response");

module.exports.getAllDirectory = asyncMiddleware(async (req, res) => {});

module.exports.createDirectory = asyncMiddleware(async (req, res) => {
  const { error } = validateDirectory(req.body);
  if (error) return req.status(422).send(errorResponsObj(error.message));

  const newDirectory = await Directory.create(req.body);
  res.send(newDirectory);
});

module.exports.editDirectory = asyncMiddleware(async (req, res) => {});

module.exports.deleteDirectory = asyncMiddleware(async (req, res) => {});
