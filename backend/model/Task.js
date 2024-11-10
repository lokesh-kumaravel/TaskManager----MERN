const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    description: { type: String },
    category: {
      type: String,
      enum: ["To Do", "In Progress", "Done", "Timeout"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "High", "Completed"],
      default: "Low",
    },
     duration: { type: Number, required: false },
    status: {
      type: String,
      enum: ["Active", "Timed Out"],
      default: "Active",
    },
    deadline: { type: Date, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
