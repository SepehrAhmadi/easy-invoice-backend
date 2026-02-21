const Invoice = require("../../model/operation/Invoice");
const Company = require("../../model/base/Company");

const moment = require("jalali-moment");

const getAllInvoices = async (req, res) => {
  const message = require("../../language/message")(req);

  const invoices = await Invoice.find().exec();
  if (!invoices) {
    return res.status(200).json({
      statusCode: 200,
      message: message.error.notFound,
      data: [],
    });
  }
  const invoicesData = invoices.map((item) => {
    return {
      id: item.id,
      invoiceNumber: item.invoiceNumber,
      companyId: item.companyId,
      companyName: item.companyName,
      companyType: item.companyType,
      companyTypeTitle: item.companyTypeTitle,
      localDate: item.localDate,
      date: item.date,
      createdDate: item.createdDate,
      lastUpdateDate: item.lastUpdateDate,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: message.success.dataReceived,
    data: {
      invoices: invoicesData,
    },
  });
};

const getInvoice = async (req, res) => {
  const message = require("../../language/message")(req);

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
  const message = require("../../language/message")(req);

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
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: message.success.added,
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
  const message = require("../../language/message")(req);

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

  const localDate = req.body.date;
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
    .then(() => {
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
  const message = require("../../language/message")(req);

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

  await invoice.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: message.success.deleted,
  });
};

module.exports = {
  getAllInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
};
