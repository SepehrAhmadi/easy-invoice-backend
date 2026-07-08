const brandService = require("../../services/base/brandService");
const AppError = require("../../utils/AppError");

const getAllBrands = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const data = await brandService.getAllBrands();
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

const getBrand = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const data = await brandService.getBrand({ params: req.params });
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

const addBrand = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await brandService.addBrand({ body: req.body, userId: req.userId });
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

const updateBrand = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await brandService.updateBrand({
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

const deleteBrand = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await brandService.deleteBrand({ params: req.params, userId: req.userId });
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

module.exports = { getAllBrands, getBrand, addBrand, updateBrand, deleteBrand };
