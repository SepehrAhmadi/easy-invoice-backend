const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  invoiceNumber: Number,
  companyId: String,
  companyName: String,
  companyType: {
    type: Number,
    enum: [1, 2], // 1 -> legalEntity & 2 -> individual
  },
  companyTypeTitle: String,
  status: {
    type: Number,
    enum: [1, 2], // 1 -> paid & 2 -> awaiting payment
    default : 2,
  },
  date: Date,
  localDate: String,
  createdDate: Date,
  lastUpdateDate: Date,
});

module.exports = mongoose.model("Invoice", invoiceSchema);
