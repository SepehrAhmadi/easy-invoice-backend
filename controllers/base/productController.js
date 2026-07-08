const productService = require("../../services/base/productService");
const AppError = require("../../utils/AppError");

const getAllProducts = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const data = await productService.getAllProducts();
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

const getProduct = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const data = await productService.getProduct({ params: req.params });
    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(499).json({
        statusCode: 400,
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

const addProduct = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await productService.addProduct({ body: req.body, userId: req.userId });
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

const updateProduct = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await productService.updateProduct({
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

const deleteProduct = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await productService.deleteProduct({
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
    res.status(500).json({
      statusCode: 500,
      message: message.error.faildToDelete,
    });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
