const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const investorSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: Number },
    marital_status: {
      type: String,
      enum: ["Domestic partnership", "Divorced", "Married", "Single", "Widowed"]
    },
    nbr_child: { type: Number },
    total_revenue: { type: Number },
    monthly_savings: { type: Number },
    annual_revenue_taxes: { type: Number },
    objectives: {
      enum: [
        "Decrease taxes",
        "Optimize savings",
        "Prepare the future",
        "Increase incomes"
      ],
      default: null
    },
    construction_works: { type: String, default: null },
    properties: {
      type: Schema.Types.ObjectId,
      ref: "Properties"
    },
    areas: {
      type: String,
      enum: [
        "One hour from Paris",
        "Two hours by train from Paris",
        "Anywhere ! As long as money's raining"
      ]
    },
    timeline: {
      type: String,
      enum: ["Now!!!!", "In the next few months"]
    },
    status: { type: Boolean, default: false },
    // completed_at: {type: Date},
    type: { type: String, default: "investor" }
  },
  {
    timestamps: { createdAt: "created_at" }
  }
);

const investorModel = mongoose.model("Investor", investorSchema);

module.exports = investorModel;
