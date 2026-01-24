const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unitSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Unit", unitSchema);
