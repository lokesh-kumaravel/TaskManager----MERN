const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["To Do", "In Progress", "Done", "Timeout"],
      default: "To Do",
    },
    duration: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Active", "Timed Out"],
      default: "Active",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", TaskSchema);
