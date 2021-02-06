const { Schema, model } = require("mongoose");
const noteSchema = require("./Note");

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
    user: joi.string().required().min(5).max(300),
  });
  return schema.validate(body);
}

module.exports = { Directory, validateDirectory };
