const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  amount: Number,
  packagingId: String,
  packagingName: String,
  packagingType: String,
  unitId: String,
  unitName: String,
});

module.exports = mongoose.model("Product", productSchema);
