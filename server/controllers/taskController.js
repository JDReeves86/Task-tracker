const router = require("express").Router();
const { Task, User, Note } = require("../../models/index");

module.exports = {
  async getTask(req, res) {
    try {
      const taskData = await Task.find({});
      !taskData
        ? res.status(404).json({ message: "No tasks found" })
        : res.status(200).json(taskData);
    } catch (err) {
      if (err) res.status(400).json(err);
    }
  },
  async postTask(req, res) {
    try {
      const taskData = await Task.create({
        task: req.body.task,
        username: req.body.username,
      });
      const userData = await User.find({
        username: req.body.username,
      }).updateOne({
        $addToSet: { tasks: taskData },
      });

      if (!userData)
        res.status(404).json({ message: "No users found by that ID" });

      !taskData
        ? res.status(404).json({ message: "Something went wrong" })
        : res.status(200).json(taskData);
    } catch (err) {
      if (err) res.status(400).json(err);
    }
  },
};
