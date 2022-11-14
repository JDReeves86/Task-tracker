const router = require("express").Router();
const { Task, User, Note } = require("../../models/index");

module.exports = {
  async getNote(req, res) {
    try {
      const noteData = await Note.find({});
      !noteData
        ? res.status(404).json({ message: "No notes found" })
        : res.status(200).json(noteData);
    } catch (err) {
      if (err) res.status(400).json(err);
    }
  },
  async postNote(req, res) {
    try {
      const noteData = await Note.create({
        note: req.body.note,
        username: req.body.username,
      });
      const userData = await User.find({
        username: req.body.username,
      }).updateOne({
        $addToSet: { notes: noteData },
      });

      if (!userData)
        res.status(404).json({ message: "No users found by that ID" });

      !noteData
        ? res.status(404).json({ message: "Something went wrong" })
        : res.status(200).json(noteData);
    } catch (err) {
      if (err) res.status(400).json(err);
    }
  },
};