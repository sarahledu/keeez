const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const emailSchema = new Schema(
  {
    email: { type: String, required: true }
  },
  {
    timestamps: { createdAt: "created_at" }
  }
);

const emailModel = mongoose.model("Email", emailSchema);

module.exports = emailModel;
