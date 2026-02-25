const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceItemSchema = new Schema({
  invoiceId: String,
  isEdit: {
    type: Boolean,
    default: false,
  },
  productId: String,
  productName: String,
  brandId: String,
  brandName: String,
  categoryId: String,
  categoryName: String,
  packagingId: String,
  packagingName: String,
  unitId: String,
  unitName: String,
  amount: Number,
  unitCount: {
    type: Number,
    default: 1,
  },
  pageCount: {
    type: Number,
    default: 1,
  },
  singlePrice: Number,
  totalPrice: Number,
  date: Date,
  localDate: String,
  createdDate: Date,
  lastUpdateDate: Date,
});

invoiceItemSchema.index({ invoiceId: 1, _id: 1 });

module.exports = mongoose.model("InvoiceItem", invoiceItemSchema);
