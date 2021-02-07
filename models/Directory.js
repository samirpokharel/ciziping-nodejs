const { Schema, model } = require("mongoose");
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const { noteSchema } = require("./Note");

const directorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      minlength: 3,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    notes: { type: [noteSchema] },
  },
  { timestamps: true }
);

const Directory = model("Directory", directorySchema);

function validateDirectory(body) {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    user: joi.objectId().required(),
  });
  return schema.validate(body);
}

module.exports = { Directory, validateDirectory };
