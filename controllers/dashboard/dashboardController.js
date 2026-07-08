const dashboardService = require("../../services/dashboard/dashboardService");

const getDashboard = async (req, res) => {
  const message = require("../../language/message")(req);

  try {
    const data = await dashboardService.getDashboard();
    res.status(200).json({
      statusCode: 200,
      message: message.success.dataReceived,
      data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      message: message.error.faildToAdd,
    });
  }
};

module.exports = { getDashboard };
