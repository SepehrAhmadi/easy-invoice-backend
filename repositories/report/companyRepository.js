const Company = require("../../model/base/Company");
const Invoice = require("../../model/operation/invoice/Invoice");
const InvoiceItem = require("../../model/operation/invoice/InvoiceItem");

const findAllInvoiceItems = async () => {
  return InvoiceItem.find();
};

const findInvoicesByPaymentStatus = async (paymentStatus) => {
  return Invoice.find({ paymentStatus });
};

const findAllCompanies = async () => {
  return Company.find();
};

const findInvoicesByCompanyId = async (companyId) => {
  return Invoice.find({ companyId });
};

const findInvoicesByCompanyIdExec = async (companyId) => {
  return Invoice.find({ companyId }).exec();
};

const findInvoiceItemsByInvoiceId = async (invoiceId) => {
  return InvoiceItem.find({ invoiceId }).exec();
};

module.exports = {
  findAllInvoiceItems,
  findInvoicesByPaymentStatus,
  findAllCompanies,
  findInvoicesByCompanyId,
  findInvoicesByCompanyIdExec,
  findInvoiceItemsByInvoiceId,
};
