const { Schema } = require("mongoose");

const noteSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      minlength: 5,
      maxlength: 40,
    },
    tags: {
      type: [String],
    },
    content: {
      type: String,
      minlength: 3,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

module.exports = noteSchema;
