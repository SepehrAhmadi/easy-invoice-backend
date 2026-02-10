const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: String,
  address: String,
  phone: Number,
  type: {
    type: Number,
    enum: [1, 2], // 1 -> legalEntity & 2 -> individual
  },
});

module.exports = mongoose.model("Company", companySchema);
