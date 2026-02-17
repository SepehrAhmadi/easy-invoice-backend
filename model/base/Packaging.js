const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packagingSchema = new Schema({
  name: String,
  type: String,
});

module.exports = mongoose.model("Packaging", packagingSchema);
