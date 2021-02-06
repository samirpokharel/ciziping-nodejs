const mongoose = require("mongoose");

function connectToDatabase() {
  mongoose
    .connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then((val) => console.log("Connected to DB.."))
    .catch((err) => console.log("Could not connet to DB !", err));
}

module.exports = connectToDatabase;
