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
        "Choose",
        "Domestic partnership",
        "Divorced",
        "Married",
        "Single",
        "Widowed"
      ],
      default: "Choose"
    },
    nbr_child: { type: Number, default: 0 },
    total_revenue: { type: Number, default: 0 },
    monthly_savings: { type: Number, default: 0 },
    annual_revenue_taxes: { type: Number, default: 0 },
    objectives: {
      type: String,
      enum: [
        "Choose",
        "Decrease taxes",
        "Optimize savings",
        "Prepare the future",
        "Increase incomes"
      ],
      default: "Choose"
    },
    project_type: {
      type: String,
      enum: ["Flat", "House", "Building", "Any"],
      default: "Any"
    },
    budget: { type: Number, defaut: "0" },
    construction_works: {
      type: String,
      enum: ["Choose", "Yes", "No"],
      default: "Choose"
    },
    properties: {
      type: Schema.Types.ObjectId,
      ref: "Properties"
    },
    areas: {
      type: String,
      enum: [
        "Choose",
        "One hour from Paris",
        "Two hours from Paris",
        "Anywhere in France"
      ],
      default: "Choose"
    },
    timeline: {
      type: String,
      enum: ["Choose", "Now!!!!", "In the next few months"],
      default: "Choose"
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
