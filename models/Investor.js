const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const investorSchema = new Schema(
  {
    firstname: { type: String, required: true },
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
    annual_revenue_taxes: { type: Number, default: null },
    objectives: { type: ["Example1", "Example2"], default: null },
    construction_works: { type: Boolean, default: null },
    properties: {
      type: Schema.Types.ObjectId,
      ref: "Properties"
    },
    areas: {
      type: [
        "One hour from Paris",
        "Two hours by train from Paris",
        "Anywhere ! As long as money's raining"
      ],
      default: null
    },
    timeline: {
      type: ["Now!!!!", "In the next few months"],
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
