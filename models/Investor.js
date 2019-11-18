const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const investorSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: Number, required: true },
    marital_status: [
      "Domestic partnership",
      "Divorced",
      "Married",
      "Single",
      "Widowed"
    ],
    nbr_child: { type: Number, default: null },
    total_revenue: { type: Number, default: null },
    monthly_savings: { type: Number, default: null },
    annual_revenu_taxes: { type: Number, default: null },
    objectives: { type: ["Example1", "Example2"], default: null },
    properties: {
      type: Schema.Types.ObjectId,
      ref: "Properties"
    },
    areas: {
      type: ["A une heure de Paris", "A deux heures de train"],
      default: null
    },
    status: { type: Boolean, default: false }
    // completed_at: {type: Date},
  },
  {
    timestamps: { createdAt: "created_at" }
  }
);

const investorModel = mongoose.model("Investor", investorSchema);

module.exports = investorModel;
