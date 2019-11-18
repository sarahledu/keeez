const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const proSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    companyname: { type: Schema.Types.ObjectId, ref: "Company" },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: Number, required: true },
    form_bought: {
      type: [{ type: Schema.Types.ObjectId, ref: "Investor" }],
      default: null
    }
  },
  {
    timestamps: { createdAt: "created_at" }
  }
);

const proModel = mongoose.model("Pro", proSchema);

module.exports = proModel;
