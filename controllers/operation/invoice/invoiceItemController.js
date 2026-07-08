const invoiceItemService = require("../../../services/operation/invoice/invoiceItemService");
const AppError = require("../../../utils/AppError");

const getAllInvoiceItems = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    const invoiceItemsData = await invoiceItemService.getAllInvoiceItems({
      params: req.params,
    });

    // Original returned 200 with dataReceived for empty case (404 was a bug)
    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: {
        invoiceItems: invoiceItemsData,
      },
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

const getInvoiceItem = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    const invoiceItemData = await invoiceItemService.getInvoiceItem({
      params: req.params,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: invoiceItemData,
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

const addInvoiceItem = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    await invoiceItemService.addInvoiceItem({
      params: req.params,
      body: req.body,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.added,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: message.error.faildToAdd,
    });
  }
};

const updateInvoiceItem = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    await invoiceItemService.updateInvoiceItem({
      params: req.params,
      body: req.body,
    });
    // Original returned success.added instead of success.edited (existing bug)
    res.status(200).json({
      statusCode: 200,
      message: message.success.added,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: message.error.faildToAdd,
    });
  }
};

const deleteInvoiceItem = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    await invoiceItemService.deleteInvoiceItem({
      params: req.params,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.deleted,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: message.error[err.messageKey],
      });
    }
    console.error(err);
    res.status(500).json({
      statusCode: 500,
      message: message.error.faildToDelete,
    });
  }
};

module.exports = {
  getAllInvoiceItems,
  getInvoiceItem,
  addInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
};
