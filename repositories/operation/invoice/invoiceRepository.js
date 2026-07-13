const Invoice = require("../../../model/operation/invoice/Invoice");
const InvoiceItem = require("../../../model/operation/invoice/InvoiceItem");
const Company = require("../../../model/base/Company");

const findInvoicesByQuery = async (query) => {
  return Invoice.find(query).lean();
};

const findInvoiceById = async (id) => {
  return Invoice.findById(id);
};

const findLastInvoiceByNumber = async () => {
  return Invoice.findOne().sort({ invoiceNumber: -1 });
};

const findCompanyById = async (companyId) => {
  return Company.findById(companyId);
};

const findInvoiceItemsByInvoiceId = async (invoiceId) => {
  return InvoiceItem.find({ invoiceId });
};

const findInvoiceExec = async (id) => {
  return Invoice.findById(id).exec();
};

const createInvoice = async (invoiceData) => {
  const invoice = new Invoice();
  invoice.invoiceNumber = invoiceData.invoiceNumber;
  invoice.companyId = invoiceData.companyId;
  invoice.companyName = invoiceData.companyName;
  invoice.companyType = invoiceData.companyType;
  invoice.companyTypeTitle = invoiceData.companyTypeTitle;
  invoice.localDate = invoiceData.localDate;
  invoice.date = invoiceData.date;
  invoice.createdDate = invoiceData.createdDate;
  return invoice.save();
};

const saveInvoice = async (invoice) => {
  return invoice.save();
};

const deleteInvoiceByDoc = async (invoice) => {
  return invoice.deleteOne();
};

const deleteInvoiceItemsByInvoiceId = async (invoiceId) => {
  return InvoiceItem.deleteMany({ invoiceId });
};

module.exports = {
  findInvoicesByQuery,
  findInvoiceById,
  findLastInvoiceByNumber,
  findCompanyById,
  findInvoiceItemsByInvoiceId,
  findInvoiceExec,
  createInvoice,
  saveInvoice,
  deleteInvoiceByDoc,
  deleteInvoiceItemsByInvoiceId,
};
