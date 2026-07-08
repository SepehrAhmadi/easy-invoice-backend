const packagingService = require("../../services/report/packagingService");
const AppError = require("../../utils/AppError");

const getReport = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const packagingsReport = await packagingService.getReport();
    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data: packagingsReport,
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

const getReportDetail = async (req, res) => {
  const message = require("../../language/message")(req);
  try {
    const data = await packagingService.getReportDetail({
      params: req.params,
    });
    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data,
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

module.exports = {
  getReport,
  getReportDetail,
};
