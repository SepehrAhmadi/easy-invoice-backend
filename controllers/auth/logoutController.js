const logoutService = require("../../services/auth/logoutService");

const handleLogout = async (req, res) => {
  const message = require("../../language/message")(req);
  const result = await logoutService.handleLogout({ cookies: req.cookies });

  if (result.noCookie && !result.missingUser) {
    return res.sendStatus(204); // no content
  }

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  if (result.missingUser) {
    return res.sendStatus(204);
  }

  res.status(200).json({
    statusCode: 200,
    message: message.success.logout,
  });
};

module.exports = { handleLogout };
