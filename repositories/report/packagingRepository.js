const Packaging = require("../../model/base/Packaging");
const InvoiceItem = require("../../model/operation/invoice/InvoiceItem");

const findAllPackagings = async () => {
  return Packaging.find();
};

const findInvoiceItemsByPackagingId = async (packagingId) => {
  return InvoiceItem.find({ packagingId });
};

module.exports = {
  findAllPackagings,
  findInvoiceItemsByPackagingId,
};
