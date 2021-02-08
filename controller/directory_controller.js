const { not } = require("joi");
const asyncMiddleware = require("../middleware/async_middleware");
const { validateDirectory, Directory } = require("../models/Directory");
const { Note, validateNote } = require("../models/Note");
const errorResponsObj = require("../response/error_response");

module.exports.getAllDirectory = asyncMiddleware(async (req, res) => {
  const directoryes = await Directory.find()
    .populate("user", "fullName email _id")
    .select("-notes");
  return res.send({
    sucess: true,
    count: directoryes.length,
    data: directoryes,
  });
});

module.exports.createDirectory = asyncMiddleware(async (req, res) => {
  const { error } = validateDirectory(req.body);
  if (error) return res.status(422).send(errorResponsObj(error.message));

  const newDirectory = await Directory.create(req.body);
  return res.send(newDirectory);
});

module.exports.editDirectory = asyncMiddleware(async (req, res) => {
  const directory = await Directory.findByIdAndUpdate(
    req.params.did,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!directory)
    return res
      .status(404)
      .send(errorResponsObj("No Directory found with given id"));
  return res.send({
    sucess: true,
    data: directory,
  });
});

module.exports.deleteDirectory = asyncMiddleware(async (req, res) => {
  const directory = await Directory.findByIdAndDelete(req.params.did);
  if (!directory)
    return res
      .status(404)
      .send(errorResponsObj("No Directory found with given id"));
  return res.send({
    sucess: true,
    data: directory,
  });
  deleteNote;
});
// <<<<<<<<<<<<<<<<<<<< notes >>>>>>>>>>>>>>>>>>>>>
module.exports.getAllNotes = asyncMiddleware(async (req, res) => {
  const docId = req.params.did;
  const notes = await Directory.findById(docId).select("notes -_id");
  if (!notes) return res.status(404).send(errorResponsObj("No Notes Found"));
  // console.log(notes);
  res.send({
    sucess: true,
    data: notes,
  });
});

module.exports.createNote = asyncMiddleware(async (req, res) => {
  const directoryId = req.params.did;
  const { error } = validateNote(req.body);
  if (error) return res.status(422).send(errorResponsObj(error.message));
  const newNote = await Note(req.body);
  const directory = await Directory.findById(directoryId);
  if (!directory)
    return res
      .status(404)
      .send(errorResponsObj("No directory found with given id"));
  directory.notes.push(newNote);
  await directory.save();
  return res.send({
    sucess: true,
    data: newNote,
  });
});

module.exports.deleteNote = asyncMiddleware(async (req, res) => {
  const directoryId = req.params.did;
  const noteId = req.params.nid;

  const directory = await Directory.findById(directoryId);
  if (!directory)
    return res
      .status(404)
      .send(errorResponsObj("No directory found with given id"));
  const note = directory.notes.id(noteId);
  note.remove();
  await directory.save();
  return res.send({
    sucess: true,
    data: note,
  });
});

// module.exports.updateNote = asyncMiddleware(async (req, res) => {
//   const directoryId = req.params.did;
//   const noteId = req.params.nid;
//   const note = await Note.findByIdAndUpdate(directoryId, {
//       $set:{
//           notes.
//       }
//   });
//   res.send({
//     sucess: true,
//     data: note,
//   });
// });
