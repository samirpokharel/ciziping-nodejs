const dotenv = require("dotenv");
const express = require("express");
const authRoute = require("./routes/auth_route");
const directoryRoute = require("./routes/directory_route");
const connectToDB = require("./utils/db");
const errorHandler = require("./middleware/error_handler");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
dotenv.config({ path: "./config/config.env" });
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("common"));
}
connectToDB();
app.use(express.json());

app.use("/api/v1/users", authRoute);
app.use("/api/v1/directory", directoryRoute);

app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`${process.env.NODE_ENV} Server started on port: ${port}...`)
);
