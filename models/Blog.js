const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  // USE CLOUDINARY YEAY !
  text: { type: String, required: true }
});

const articleModel = mongoose.model("Blog", articleSchema);

module.exports = articleModel;
