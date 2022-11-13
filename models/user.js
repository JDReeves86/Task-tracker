const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
// const { Task } = require("./index");
const {
  emailValidate,
  passStrength,
  comparePassword,
} = require("../helpers/validators");
const { hashPass } = require("../helpers/helpers");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "You need to enter a user name my dude."],
      unique: [true, "That username is not available."],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      validate: {
        validator: function (password) {
          return passStrength(password);
        },
        message: "Your password is weak, like you",
      },
    },
    email: {
      type: String,
      required: [true, "Please enter an e-mail, bro"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return emailValidate(email);
        },
        message: "Bruh, enter a valid email address.",
      },
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "task",
      },
    ],
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "note",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    statics: {
      function(password) {
        comparePassword(password, this.password);
      },
    },
  }
);

userSchema.virtual("taskCount").get(function () {
  return this.tasks.length;
});
userSchema.virtual("noteCount").get(function () {
  return this.notes.length;
});

userSchema.pre("save", async function () {
  this.password = await hashPass(this.password);
});

const User = model("user", userSchema);

module.exports = User;
