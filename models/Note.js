// const { Schema, model } = require("mongoose");
const { Schema, model } = require("mongoose");

const joi = require("joi");

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

const Note = model("Note", noteSchema);

function validateNote(body) {
  const schema = joi.object({
    title: joi.string().min(3),
    tags: joi.array().required(),
    content: joi.string().required().min(6).max(400),
  });
  return schema.validate(body);
}
module.exports = { Note, noteSchema, validateNote };
