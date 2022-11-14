const router = require("express").Router();
const { Task, User, Note } = require("../../models/index");

module.exports = {
  async getUser(req, res) {
    try {
      const userData = await User.findOne({
        username: req.body.username,
      });

      // rejects if no user data found
      if (!userData) {
        res.status(400).json({ message: "No users by that name found" });
        return;
      }

      // compares email addresses
      if (req.body.email !== userData.email) {
        res.status(400).json({ message: "invalid email address" });
        return;
      }

      // calls static to compare input password with hashed password
      const validPassword = await userData.schema.statics.comparePassword(
        req.body.password,
        userData.password
      );

      // rejects if static method fails.
      if (!validPassword) {
        res.status(400).json({ message: "invalid password" });
        return;
      }

      res.status(200).json(userData);
    } catch (err) {
      console.log(err);
      if (err) res.status(400).json(err);
    }
  },
  async postUser(req, res) {
    try {
      const duplicateUser = await User.findOne({
        username: req.body.username,
      });
      if (duplicateUser) {
        res
          .status(400)
          .json({ message: "A user by that name already exists." });
        return;
      }
      const duplicateEmail = await User.findOne({
        email: req.body.email,
      });
      if (duplicateEmail) {
        res
          .status(400)
          .json({ message: "An account with that email already exists." });
        return;
      }

      const userData = await User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });
      !userData
        ? res.status(404).json({ message: "No users found by that ID!" })
        : res.status(200).json(userData);
    } catch (err) {
      if (err) res.status(400).json(err);
    }
  },
};
