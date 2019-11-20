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
        "Chose",
        "Domestic partnership",
        "Divorced",
        "Married",
        "Single",
        "Widowed"
      ],
      default: "Chose"
    },
    nbr_child: { type: Number, default: 0 },
    total_revenue: { type: Number, default: 0 },
    monthly_savings: { type: Number, default: 0 },
    annual_revenue_taxes: { type: Number, default: 0 },
    objectives: {
      type: String,
      enum: [
        "Chose",
        "Decrease taxes",
        "Optimize savings",
        "Prepare the future",
        "Increase incomes"
      ],
      default: "Chose"
    },
    construction_works: {
      type: String,
      enum: ["Chose", "Yes", "No"],
      default: "Chose"
    },
    properties: {
      type: Schema.Types.ObjectId,
      ref: "Properties"
    },
    areas: {
      type: String,
      enum: [
        "Chose",
        "One hour from Paris",
        "Two hours from Paris",
        "Anywhere in France"
      ],
      default: "Chose"
    },
    timeline: {
      type: String,
      enum: ["Chose", "Now!!!!", "In the next few months"],
      default: "Chose"
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
