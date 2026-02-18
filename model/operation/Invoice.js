const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  invoiceNumber: Number,
  companyId: String,
  companyName: String,
  invoiceDate: Date,
  localInvoiceDate: Date,
  createdDate: Date,
  lastUpdateDate: Date,
});

module.exports = mongoose.model("Invoice", invoiceSchema);
