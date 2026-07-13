const invoiceRepository = require("../../../repositories/operation/invoice/invoiceRepository");
const notificationService = require("../../notification/notificationService");
const AppError = require("../../../utils/AppError");

const moment = require("jalali-moment");

const NOTIFICATION_TYPE = {
  CREATE: "invoice_created",
  UPDATE: "invoice_updated",
  DELETE: "invoice_deleted",
  PAID: "invoice_paid",
  AWAITING_PAYMENT: "invoice_awaiting_payment",
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

  const invoices = await invoiceRepository.findInvoicesByQuery(query);

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

  const invoice = await invoiceRepository.findInvoiceById(params.id);
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

  let invoiceNumber = 1001;
  let lastInvoiceNumber = await invoiceRepository.findLastInvoiceByNumber();
  if (lastInvoiceNumber) {
    invoiceNumber = lastInvoiceNumber.invoiceNumber + 1;
  }

  const company = await invoiceRepository.findCompanyById(body.companyId);
  if (!company) throw new AppError(400, "invalidCompanyId");

  const localDate = body.localDate;
  const isValidDate = moment(localDate, "jYYYY/jMM/jDD", true).isValid();
  if (!isValidDate) throw new AppError(400, "invalidDate");
  const gregorianDate = moment
    .from(localDate, "fa", "YYYY/MM/DD")
    .startOf("day")
    .toDate();

  const invoice = await invoiceRepository.createInvoice({
    invoiceNumber,
    companyId: body.companyId,
    companyName: company.name,
    companyType: company.type,
    companyTypeTitle: company.typeTitle,
    localDate,
    date: gregorianDate,
    createdDate: new Date(),
  });

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

  const invoice = await invoiceRepository.findInvoiceExec(params.id);
  if (!invoice) throw new AppError(400, "notFound");

  if (!body.companyId && !body.date) {
    throw new AppError(400, "requireFields");
  }

  const company = await invoiceRepository.findCompanyById(body.companyId);
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

  await invoiceRepository.saveInvoice(invoice);

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

  const invoice = await invoiceRepository.findInvoiceExec(params.id);
  if (!invoice) throw new AppError(400, "notFound");

  await invoiceRepository.deleteInvoiceItemsByInvoiceId(params.id);
  await invoiceRepository.deleteInvoiceByDoc(invoice);

  await notificationService.create({
    userId,
    action: "delete",
    type: NOTIFICATION_TYPE.DELETE,
    data: {
      invoiceNumber: invoice.invoiceNumber,
    },
  });
};

const changeStatus = async ({ params, body, userId }) => {
  if (!params?.id) throw new AppError(400, "idRequired");

  if (![1, 2].includes(body.paymentStatus)) {
    throw new AppError(400, "requireFields");
  }

  const invoice = await invoiceRepository.findInvoiceExec(params.id);
  if (!invoice) throw new AppError(400, "notFound");

  invoice.paymentStatus = body.paymentStatus;
  invoice.paymentStatusName =
    body.paymentStatus == 1 ? "Paid" : "Awaiting payment";

  await invoiceRepository.saveInvoice(invoice);

  await notificationService.create({
    userId,
    action: "change_status",
    type:
      body.paymentStatus == 1
        ? NOTIFICATION_TYPE.PAID
        : NOTIFICATION_TYPE.AWAITING_PAYMENT,
    data: {
      invoiceNumber: invoice.invoiceNumber,
    },
  });
};

const printInvoice = async ({ params }) => {
  if (!params.id) throw new AppError(400, "idRequired");

  const invoice = await invoiceRepository.findInvoiceExec(params.id);
  if (!invoice) throw new AppError(404, "notFound");

  const invoiceItems = await invoiceRepository.findInvoiceItemsByInvoiceId(params.id);
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
