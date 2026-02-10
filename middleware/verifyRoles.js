const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const message = require("../language/message")(req);

    if (!req?.roles) {
      return res.status(401).json({
        statusCode: 401,
        message: message.error.noRole,
      });
    }
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) {
      return res.status(403).json({
        statusCode: 403,
        message: message.error.noPermission,
      });
    }
    next();
  };
};

module.exports = verifyRoles;
