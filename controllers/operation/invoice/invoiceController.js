const Invoice = require("../../../model/operation/invoice/Invoice");
const InvoiceItem = require("../../../model/operation/invoice/InvoiceItem");
const Company = require("../../../model/base/Company");
const notificationService = require("../../../services/notification/notificationService");

const moment = require("jalali-moment");

// invoice type
const NOTIFICATION_TYPE = {
  CREATE: "invoice_created",
  UPDATE: "invoice_updated",
  DELETE: "invoice_deleted",
};

// payment status type
const PAYMENT_STATUS_TYPE = {
  PAID: 1,
  AWAITING_PAYMENT: 2,
};

const getAllInvoices = async (req, res) => {
  const message = require("../../../language/message")(req);

  const { fromDate, toDate, paymentStatus, companyType } = req.query;

  let query = {};

  if (fromDate && toDate) {
    const isValidFrom = moment(fromDate, "jYYYY/jMM/jDD", true).isValid();
    const isValidTo = moment(toDate, "jYYYY/jMM/jDD", true).isValid();

    if (!isValidFrom || !isValidTo) {
      return res.status(400).json({
        statusCode: 400,
        message: message.error.invalidDate,
      });
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

  try {
    const invoices = await Invoice.find(query).lean();

    if (!invoices.length) {
      return res.status(200).json({
        statusCode: 200,
        message: message.error.notFound,
        data: [],
      });
    }

    const invoicesData = invoices.map((item) => ({
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

    return res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: { invoices: invoicesData },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: message.error.serverError,
    });
  }
};

const getInvoice = async (req, res) => {
  const message = require("../../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) {
    return res.status(404).json({
      statusCode: 404,
      message: message.error.notFound,
    });
  }
  const invoiceData = {
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

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: invoiceData,
  });
};

const addInvoice = async (req, res) => {
  const message = require("../../../language/message")(req);

  if (!req.body.companyId && !req.body.date) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  const invoice = new Invoice();

  let invoiceNumber = 1001;
  let lastInvoiceNumber = await Invoice.findOne().sort({ invoiceNumber: -1 });
  if (lastInvoiceNumber) {
    invoiceNumber = lastInvoiceNumber.invoiceNumber + 1;
  }
  invoice.invoiceNumber = invoiceNumber;

  const company = await Company.findById(req.body.companyId);
  if (!company) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidCompanyId,
    });
  }
  invoice.companyId = req.body.companyId;
  invoice.companyName = company.name;
  invoice.companyType = company.type;
  invoice.companyTypeTitle = company.typeTitle;

  const localDate = req.body.localDate;
  const isValidDate = moment(localDate, "jYYYY/jMM/jDD", true).isValid();
  if (!isValidDate) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidDate,
    });
  }
  invoice.localDate = localDate;
  const gregorianDate = moment
    .from(localDate, "fa", "YYYY/MM/DD")
    .startOf("day")
    .toDate();
  invoice.date = gregorianDate;
  invoice.createdDate = new Date();

  invoice
    .save()
    .then(async () => {
      await notificationService.create({
        userId: req.userId,
        type: NOTIFICATION_TYPE.CREATE,
        data: {
          invoiceNumber: invoice.invoiceNumber,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: message.success.added,
        id: invoice.id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToAdd,
      });
    });
};

const updateInvoice = async (req, res) => {
  const message = require("../../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const invoice = await Invoice.findById(req.params.id).exec();
  if (!invoice) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  if (!req.body.companyId && !req.body.date) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  const company = await Company.findById(req.body.companyId);
  if (!company) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidCompanyId,
    });
  }
  invoice.companyId = req.body.companyId;
  invoice.companyName = company.name;
  invoice.companyType = company.type;
  invoice.companyTypeTitle = company.typeTitle;

  const localDate = req.body.localDate;
  const isValidDate = moment(localDate, "jYYYY/jMM/jDD", true).isValid();
  if (!isValidDate) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.invalidDate,
    });
  }
  invoice.localDate = localDate;
  const gregorianDate = moment
    .from(localDate, "fa", "YYYY/MM/DD")
    .startOf("day")
    .toDate();
  invoice.date = gregorianDate;
  invoice.lastUpdateDate = new Date();

  invoice
    .save()
    .then(async () => {
      await notificationService.create({
        userId: req.userId,
        type: NOTIFICATION_TYPE.UPDATE,
        data: {
          invoiceNumber: invoice.invoiceNumber,
        },
      });

      res.status(200).json({
        statusCode: 200,
        message: message.success.edited,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToEdit,
      });
    });
};

const deleteInvoice = async (req, res) => {
  const message = require("../../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const invoice = await Invoice.findById(req.params.id).exec();
  if (!invoice) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.notFound,
    });
  }

  await InvoiceItem.deleteMany({ invoiceId: req.params.id });
  await invoice.deleteOne();

  await notificationService.create({
    userId: req.userId,
    type: NOTIFICATION_TYPE.DELETE,
    data: {
      invoiceNumber: invoice.invoiceNumber,
    },
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.deleted,
  });
};

const changeStatus = async (req, res) => {
  const message = require("../../../language/message")(req);

  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  if (![1, 2].includes(req.body.paymentStatus)) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.requireFields,
    });
  }

  const invoice = await Invoice.findById(req.params.id).exec();
  invoice.paymentStatus = req.body.paymentStatus;
  invoice.paymentStatusName =
    req.body.paymentStatus == 1 ? "Paid" : "Awaiting payment";

  invoice
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: message.success.statusChanged,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: message.error.faildToEdit,
      });
    });
};

const printInvoice = async (req, res) => {
  const message = require("../../../language/message")(req);

  if (!req.params.id) {
    return res.status(400).json({
      statusCode: 400,
      message: message.error.idRequired,
    });
  }

  const invoice = await Invoice.findById(req.params.id).exec();
  if (!invoice) {
    return res.status(404).json({
      statusCode: 404,
      message: message.error.notFound,
    });
  }

  const invoiceItems = await InvoiceItem.find({ invoiceId: req.params.id });
  let invoiceItemsData = [];
  let totalPrice = 0;
  if (invoiceItems) {
    invoiceItemsData = invoiceItems.map((item) => {
      const designType = item.isEdit
        ? message.response.edit
        : message.response.design;
      const productDisplayName = `${designType} ${item.categoryName} ${item.amount} ${item.unitName} - ${item.brandName} - ${item.productName}`;
      totalPrice += item.totalPrice;
      return {
        id: item.id,
        prroduntDisplayName: productDisplayName,
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

  const printData = {
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

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: printData,
  });
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
