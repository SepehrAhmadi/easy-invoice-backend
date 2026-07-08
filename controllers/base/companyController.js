const companyService = require("../../services/base/companyService");
const AppError = require("../../utils/AppError");

const getAllCompanies = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const data = await companyService.getAllCompanies();
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

const getCompany = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const data = await companyService.getCompany({ params: req.params });
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

const addCompany = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await companyService.addCompany({ body: req.body, userId: req.userId });
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

const updateCompany = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await companyService.updateCompany({
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

const deleteCompany = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    await companyService.deleteCompany({
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
  getAllCompanies,
  getCompany,
  addCompany,
  updateCompany,
  deleteCompany,
};
