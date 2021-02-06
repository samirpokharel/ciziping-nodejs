const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config/config.env" });

const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`${process.env.NODE_ENV} Server started on port: ${port}...`)
);
