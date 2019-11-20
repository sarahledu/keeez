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
      enum: [
        "Chose one",
        "Domestic partnership",
        "Divorced",
        "Married",
        "Single",
        "Widowed"
      ],
      default: "Chose one"
    },
    nbr_child: { type: Number },
    total_revenue: { type: Number },
    monthly_savings: { type: Number },
    annual_revenue_taxes: { type: Number },
    objectives: {
      type: String,
      enum: [
        "Chose one",
        "Decrease taxes",
        "Optimize savings",
        "Prepare the future",
        "Increase incomes"
      ],
      default: "Chose one"
    },
    construction_works: { type: String },
    properties: {
      type: Schema.Types.ObjectId,
      ref: "Properties"
    },
    areas: {
      type: String,
      enum: [
        "Chose one",
        "One hour from Paris",
        "Two hours from Paris",
        "Anywhere in France"
      ],
      default: "Chose one"
    },
    timeline: {
      type: String,
      enum: ["Chose one", "Now!!!!", "In the next few months"],
      default: "Chose one"
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
