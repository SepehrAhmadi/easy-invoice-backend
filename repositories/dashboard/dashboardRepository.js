const Invoice = require("../../model/operation/invoice/Invoice");
const InvoiceItem = require("../../model/operation/invoice/InvoiceItem");
const Company = require("../../model/base/Company");
const Packaging = require("../../model/base/Packaging");
const Product = require("../../model/base/Product");

const findAllPackagings = async () => {
  return Packaging.find();
};

const findAllInvoices = async () => {
  return Invoice.find();
};

const findAllInvoiceItems = async () => {
  return InvoiceItem.find();
};

const findAllCompanies = async () => {
  return Company.find();
};

const findInvoicesByCompanyId = async (companyId) => {
  return Invoice.find({ companyId });
};

const findInvoicesByPaymentStatus = async (paymentStatus) => {
  return Invoice.find({ paymentStatus });
};

const findProductsByPackagingId = async (packagingId) => {
  return Product.find({ packagingId });
};

module.exports = {
  findAllPackagings,
  findAllInvoices,
  findAllInvoiceItems,
  findAllCompanies,
  findInvoicesByCompanyId,
  findInvoicesByPaymentStatus,
  findProductsByPackagingId,
};
