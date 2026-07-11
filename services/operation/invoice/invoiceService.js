const Invoice = require("../../../model/operation/invoice/Invoice");
const InvoiceItem = require("../../../model/operation/invoice/InvoiceItem");
const Company = require("../../../model/base/Company");
const notificationService = require("../../notification/notificationService");
const AppError = require("../../../utils/AppError");

const moment = require("jalali-moment");

const NOTIFICATION_TYPE = {
  CREATE: "invoice_created",
  UPDATE: "invoice_updated",
  DELETE: "invoice_deleted",
};

const getAllInvoices = async ({ query: queryParams }) => {
  const { fromDate, toDate, paymentStatus, companyType } = queryParams;

  let query = {};

  if (fromDate && toDate) {
    const isValidFrom = moment(fromDate, "jYYYY/jMM/jDD", true).isValid();
    const isValidTo = moment(toDate, "jYYYY/jMM/jDD", true).isValid();

    if (!isValidFrom || !isValidTo) {
      throw new AppError(400, "invalidDate");
    }

    const gteDate = moment(fromDate, "jYYYY/jMM/jDD").startOf("day").toDate();
    const lteDate = moment(toDate, "jYYYY/jMM/jDD").endOf("day").toDate();

    query.date = {
      $gte: gteDate,
      $lte: lteDate,
    };
  }

  if (paymentStatus) {
    query.paymentStatus = Number(paymentStatus);
  }

  if (companyType) {
    query.companyType = Number(companyType);
  }

  const invoices = await Invoice.find(query).lean();

  if (!invoices.length) {
    throw new AppError(200, "notFound");
  }

  return invoices.map((item) => ({
    id: item._id,
    invoiceNumber: item.invoiceNumber,
    companyId: item.companyId,
    companyName: item.companyName,
    companyType: item.companyType,
    companyTypeTitle: item.companyTypeTitle,
    paymentStatus: item.paymentStatus,
    paymentStatusName: item.paymentStatusName,
    totalPrice: item.totalPrice,
    localDate: item.localDate,
    date: item.date,
    createdDate: item.createdDate,
    lastUpdateDate: item.lastUpdateDate,
  }));
};

const getInvoice = async ({ params }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const invoice = await Invoice.findById(params.id);
  if (!invoice) throw new AppError(404, "notFound");

  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    companyId: invoice.companyId,
    companyName: invoice.companyName,
    companyType: invoice.companyType,
    companyTypeTitle: invoice.companyTypeTitle,
    paymentStatus: invoice.paymentStatus,
    paymentStatusName: invoice.paymentStatusName,
    totalPrice: invoice.totalPrice,
    localDate: invoice.localDate,
    date: invoice.date,
    createdDate: invoice.createdDate,
    lastUpdateDate: invoice.lastUpdateDate,
  };
};

const addInvoice = async ({ body, userId }) => {
  if (!body.companyId && !body.date) {
    throw new AppError(400, "requireFields");
  }

  const invoice = new Invoice();

  let invoiceNumber = 1001;
  let lastInvoiceNumber = await Invoice.findOne().sort({ invoiceNumber: -1 });
  if (lastInvoiceNumber) {
    invoiceNumber = lastInvoiceNumber.invoiceNumber + 1;
  }
  invoice.invoiceNumber = invoiceNumber;

  const company = await Company.findById(body.companyId);
  if (!company) throw new AppError(400, "invalidCompanyId");
  invoice.companyId = body.companyId;
  invoice.companyName = company.name;
  invoice.companyType = company.type;
  invoice.companyTypeTitle = company.typeTitle;

  const localDate = body.localDate;
  const isValidDate = moment(localDate, "jYYYY/jMM/jDD", true).isValid();
  if (!isValidDate) throw new AppError(400, "invalidDate");
  invoice.localDate = localDate;
  const gregorianDate = moment
    .from(localDate, "fa", "YYYY/MM/DD")
    .startOf("day")
    .toDate();
  invoice.date = gregorianDate;
  invoice.createdDate = new Date();

  await invoice.save();

  await notificationService.create({
    userId,
    action: "add",
    type: NOTIFICATION_TYPE.CREATE,
    data: {
      invoiceNumber: invoice.invoiceNumber,
    },
  });

  return { id: invoice.id };
};

const updateInvoice = async ({ params, body, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const invoice = await Invoice.findById(params.id).exec();
  if (!invoice) throw new AppError(400, "notFound");

  if (!body.companyId && !body.date) {
    throw new AppError(400, "requireFields");
  }

  const company = await Company.findById(body.companyId);
  if (!company) throw new AppError(400, "invalidCompanyId");
  invoice.companyId = body.companyId;
  invoice.companyName = company.name;
  invoice.companyType = company.type;
  invoice.companyTypeTitle = company.typeTitle;

  const localDate = body.localDate;
  const isValidDate = moment(localDate, "jYYYY/jMM/jDD", true).isValid();
  if (!isValidDate) throw new AppError(400, "invalidDate");
  invoice.localDate = localDate;
  const gregorianDate = moment
    .from(localDate, "fa", "YYYY/MM/DD")
    .startOf("day")
    .toDate();
  invoice.date = gregorianDate;
  invoice.lastUpdateDate = new Date();

  await invoice.save();

  await notificationService.create({
    userId,
    action: "update",
    type: NOTIFICATION_TYPE.UPDATE,
    data: {
      invoiceNumber: invoice.invoiceNumber,
    },
  });
};

const deleteInvoice = async ({ params, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  const invoice = await Invoice.findById(params.id).exec();
  if (!invoice) throw new AppError(400, "notFound");

  await InvoiceItem.deleteMany({ invoiceId: params.id });
  await invoice.deleteOne();

  await notificationService.create({
    userId,
    action: "delete",
    type: NOTIFICATION_TYPE.DELETE,
    data: {
      invoiceNumber: invoice.invoiceNumber,
    },
  });
};

const changeStatus = async ({ params, body }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  if (![1, 2].includes(body.paymentStatus)) {
    throw new AppError(400, "requireFields");
  }

  const invoice = await Invoice.findById(params.id).exec();
  invoice.paymentStatus = body.paymentStatus;
  invoice.paymentStatusName =
    body.paymentStatus == 1 ? "Paid" : "Awaiting payment";

  await invoice.save();
};

const printInvoice = async ({ params }) => {
  if (!params.id) throw new AppError(400, "idRequired");

  const invoice = await Invoice.findById(params.id).exec();
  if (!invoice) throw new AppError(404, "notFound");

  const invoiceItems = await InvoiceItem.find({ invoiceId: params.id });
  let invoiceItemsData = [];
  let totalPrice = 0;
  if (invoiceItems) {
    invoiceItemsData = invoiceItems.map((item) => {
      totalPrice += item.totalPrice;
      return {
        id: item.id,
        invoiceId: item.invoiceId,
        isEdit: item.isEdit,
        productId: item.productId,
        productName: item.productName,
        brandId: item.brandId,
        brandName: item.brandName,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        packagingId: item.packagingId,
        packagingName: item.packagingName,
        unitId: item.unitId,
        unitName: item.unitName,
        amount: item.amount,
        unitCount: item.unitCount,
        pageCount: item.pageCount,
        singlePrice: item.singlePrice,
        totalPrice: item.totalPrice,
        localDate: item.localDate,
        createdDate: item.createdDate,
        lastUpdateDate: item.lastUpdateDate,
        description: item.description,
      };
    });
  }

  return {
    id: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    companyId: invoice.companyId,
    companyName: invoice.companyName,
    companyType: invoice.companyType,
    companyTypeTitle: invoice.companyTypeTitle,
    paymentStatus: invoice.paymentStatus,
    paymentStatusName: invoice.paymentStatusName,
    localDate: invoice.localDate,
    totalPrice: totalPrice,
    count: invoiceItems.length,
    date: invoice.date,
    invoiceItems: invoiceItemsData,
  };
};

module.exports = {
  getAllInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  changeStatus,
  printInvoice,
};
