const dotenv = require("dotenv");
const express = require("express");
const authRoute = require("./routes/auth_route");
const directoryRoute = require("./routes/directory_route");
const connectToDB = require("./utils/db");
const errorHandler = require("./middleware/error_handler");
dotenv.config({ path: "./config/config.env" });

connectToDB();
const app = express();
app.use(express.json());

app.use("/api/v1/users", authRoute);
app.use("/api/v1/dirctory", directoryRoute);

app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`${process.env.NODE_ENV} Server started on port: ${port}...`)
);
