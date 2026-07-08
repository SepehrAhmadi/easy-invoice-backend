const invoiceService = require("../../../services/operation/invoice/invoiceService");
const AppError = require("../../../utils/AppError");

const getAllInvoices = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    const invoicesData = await invoiceService.getAllInvoices({
      query: req.query,
    });

    return res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: { invoices: invoicesData },
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
      message: message.error.serverError,
    });
  }
};

const getInvoice = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    const invoiceData = await invoiceService.getInvoice({ params: req.params });
    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: invoiceData,
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

const addInvoice = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    const result = await invoiceService.addInvoice({
      body: req.body,
      userId: req.userId,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.added,
      id: result.id,
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

const updateInvoice = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    await invoiceService.updateInvoice({
      params: req.params,
      body: req.body,
      userId: req.userId,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.edited,
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
      message: message.error.faildToEdit,
    });
  }
};

const deleteInvoice = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    await invoiceService.deleteInvoice({
      params: req.params,
      userId: req.userId,
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
    return res.status(500).json({
      statusCode: 500,
      message: message.error.faildToDelete,
    });
  }
};

const changeStatus = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    await invoiceService.changeStatus({
      params: req.params,
      body: req.body,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.statusChanged,
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
      message: message.error.faildToEdit,
    });
  }
};

const printInvoice = async (req, res) => {
  const message = require("../../../language/message")(req);
  try {
    const printData = await invoiceService.printInvoice({
      params: req.params,
    });

    // Add designType to each item using message.response (translated)
    if (printData.invoiceItems) {
      printData.invoiceItems = printData.invoiceItems.map((item) => {
        const designType = item.isEdit
          ? message.response.edit
          : message.response.design;
        const productDisplayName = `${designType} ${item.categoryName} ${item.amount} ${item.unitName} - ${item.brandName} - ${item.productName}`;
        return {
          ...item,
          prroduntDisplayName: productDisplayName,
        };
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: printData,
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

module.exports = {
  getAllInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  changeStatus,
  printInvoice,
};
