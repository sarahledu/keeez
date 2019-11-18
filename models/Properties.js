const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const propertiesSchema = new Schema(
  {
    type_property: { type: ["House", "Flat"], required: true },
    
    city: { type: String, required: true },
    acquisition_price: { type: Number, required: true },
    total_borrowed_amount: { type: Number, required: true },
    monthly_loan
  },
  {
    timestamps: { createdAt: "created_at" }
  }
);

const propertiesModel = mongoose.model("Properties", propertiesSchema);

module.exports = propertiesModel;
