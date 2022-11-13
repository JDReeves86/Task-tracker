const { Schema, model } = require("mongoose");
const { formatDate } = require("../helpers/getters");
// const { User } = require("./index");

const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 150,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
      get: formatDate
    },
    dueDate: {
      type: Date,
      required: false,
    },
    note: {
      type: Schema.Types.ObjectId,
      ref: 'note'
    }
  },
  {
    toJSON: {
      getters: true,
    },
    timestamps: true,
  }
);

const Task = model("tasks", taskSchema);

module.exports = Task;
