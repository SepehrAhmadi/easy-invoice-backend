const categoryService = require("../../services/base/categoryService");
const AppError = require("../../utils/AppError");

const getAllCategories = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const data = await categoryService.getAllCategories();
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

const getCategory = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const data = await categoryService.getCategory({ params: req.params });
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

const addCategory = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await categoryService.addCategory({ body: req.body, userId: req.userId });
    res.status(201).json({
      statusCode: 201,
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

const updateCategory = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await categoryService.updateCategory({
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

const deleteCategory = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await categoryService.deleteCategory({
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
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};
