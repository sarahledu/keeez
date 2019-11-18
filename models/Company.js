const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const proSchema = new Schema(
  {
    name: { type: String, required: true },
    siret: { type: String, required: true }
  },
  {
    timestamps: { createdAt: "created_at" }
  }
);

const companyModel = mongoose.model("Company", proSchema);

module.exports = companyModel;
