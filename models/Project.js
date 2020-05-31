const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  project: 
    {
      user: {
        type: mongoose.Schema.Types.ObjectId
      },
      projectName: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
    todos: [
      {
        todo: {
          type: String,
          required: true
        },
        completed: {
          type: Boolean,
          default: false
        },
        user: {
          type: mongoose.Schema.Types.ObjectId
        }
      }
    ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Project = mongoose.model("project", ProjectSchema);
