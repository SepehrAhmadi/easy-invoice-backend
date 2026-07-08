const companyService = require("../../services/report/companyService");
const AppError = require("../../utils/AppError");

const getReport = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const data = await companyService.getReport();
    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: message.error.faildToAdd,
    });
  }
};

const getInvoices = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const invoicesData = await companyService.getInvoices({
      params: req.params,
    });
    return res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: invoicesData,
    });
  } catch (err) {
    if (err instanceof AppError) {
      if (err.statusCode === 200) {
        return res.status(200).json({
          statusCode: 200,
          message: message.error[err.messageKey],
          data: [],
        });
      }
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: message.error.faildToAdd,
    });
  }
};

const getInvoiceItems = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const invoiceItemsData = await companyService.getInvoiceItems({
      params: req.params,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: invoiceItemsData,
    });
  } catch (err) {
    if (err instanceof AppError) {
      if (err.statusCode === 404 && err.messageKey === "dataReceived") {
        return res.status(404).json({
          statusCode: 404,
          message: message.success.dataReceived,
          data: [],
        });
      }
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey] ?? message.error.notFound,
      });
    }
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: message.error.faildToAdd,
    });
  }
};

module.exports = { getReport, getInvoices, getInvoiceItems };
