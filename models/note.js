const { Schema, model } = require("mongoose");
const { formatDate } = require("../helpers/getters");
const { User, Task } = require('./index');

const noteSchema = new Schema(
    {
      note: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 10000,
        trim: true,
      },
      username: {
        type: String,
        required: true,
      },
      task: {
        type: Schema.Types.ObjectId,
        ref: 'task'
      },
      createdAt: {
        type: Date,
        default: new Date(),
        get: (date) => {
          return formatDate(date);
        },
      },
    },
    {
      toJSON: {
        getters: true,
      },
      timestamps: true,
    }
  );
  
  const Task = model("tasks", noteSchema);
  
  module.exports = Task;