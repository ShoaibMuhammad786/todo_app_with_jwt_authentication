const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true, default: Date.now() },
    endDate: { type: Date, required: true, default: null },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in-progress", "pending approval", "completed"],
      default: "pending",
    },
    priority: { type: String, required: true, default: "Normal" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todos", todoSchema);
