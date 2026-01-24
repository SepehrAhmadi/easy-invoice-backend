const Invoice = require("../../model/operation/Invoice");
const Company = require("../../model/base/Company");

const { format } = require("date-fns");

const getAllInvoices = async (req, res) => {
  const invoices = await Invoice.find().exec();
  if (!invoices) {
    return res.status(200).json({
      statusCode: 200,
      message: "No Invoices found",
      data: [],
    });
  }
  const invoicesData = invoices.map((item) => {
    return {
      id: item.id,
      invoiceNumber: item.invoiceNumber,
      companyId: item.companyId,
      companyName: item.companyName,
      invoiceDate: item.invoiceDate,
      createdDate: item.createdDate,
      lastUpdateDate: item.lastUpdateDate,
    };
  });

  res.status(200).json({
    statusCode: 200,
    message: "Invoices were successfuly received",
    data: {
      invoices: invoicesData,
    },
  });
};

const getInvoice = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: `ID parameters is required`,
    });
  }

  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) {
    return res.status(404).json({
      statusCode: 404,
      message: `Invoice ID ${req.params.id} not found`,
    });
  }
  const invoiceData = {
    id: item.id,
    invoiceNumber: invoice.invoiceNumber,
    companyId: invoice.companyId,
    companyName: invoice.companyName,
    invoiceDate: invoice.invoiceDate,
    createdDate: invoice.createdDate,
    lastUpdateDate: invoice.lastUpdateDate,
  };

  res.status(200).json({
    statusCode: 200,
    message: "Invoice successfully received",
    data: invoiceData,
  });
};

const addInvoice = async (req, res) => {
  if (!req.body.companyId && !req.body.invoiceDate) {
    return res.status(400).json({
      statusCode: 400,
      message: "Please enter the require fields",
    });
  }

  const invoice = new Invoice();

  let invoiceNumber = 1001;
  let lastInvoiceNumber = await Invoice.findOne().sort({ invoiceNumber: -1 });
  console.log("last invoice number", lastInvoiceNumber);
  if (lastInvoiceNumber) {
    invoiceNumber = lastInvoiceNumber.invoiceNumber + 1;
  }
  invoice.invoiceNumber = invoiceNumber;

  const company = await Company.findById(req.body.companyId);
  if (!company) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid companyId",
    });
  }
  invoice.companyId = req.body.companyId;
  invoice.companyName = company.name;

  invoice.invoiceDate = req.body.invoiceDate;
  invoice.createdDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

  invoice
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: "Invoice successfully added",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: "faild to add Invoice",
      });
    });
};

const updateInvoice = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: `ID parameters is required`,
    });
  }

  const invoice = await Invoice.findById(req.params.id).exec();
  if (!invoice) {
    return res.status(400).json({
      statusCode: 400,
      message: `Invoice ID ${req.params.id} not found`,
    });
  }

  if (!req.body.companyId && !req.body.invoiceDate) {
    return res.status(400).json({
      statusCode: 400,
      message: "Please enter the require fields",
    });
  }

  const company = await Company.findById(req.body.companyId);
  if (!company) {
    return res.status(400).json({
      statusCode: 400,
      message: "invalid companyId",
    });
  }
  invoice.companyId = req.body.companyId;
  invoice.companyName = company.name;

  invoice.invoiceDate = req.body.invoiceDate;
  invoice.createdDate = format(new Date(), "yyyy-MM-dd \t HH:mm:ss");
  invoice.lastUpdateDate = format(new Date(), "yyyy-MM-dd \t HH:mm:ss");

  invoice
    .save()
    .then(() => {
      res.status(200).json({
        statusCode: 200,
        message: "Invoice successfully updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        statusCode: 500,
        message: "faild to add Invoice",
      });
    });
};

const deleteInvoice = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({
      statusCode: 400,
      message: `ID parameters is required`,
    });
  }

  const invoice = await Invoice.findById(req.params.id).exec();
  if (!invoice) {
    return res.status(400).json({
      statusCode: 400,
      message: `Invoice ID ${req.params.id} not found`,
    });
  }

  await invoice.deleteOne();

  res.status(200).json({
    statusCode: 200,
    message: "Invoice successfully deleted",
  });
};

module.exports = {
  getAllInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
};
