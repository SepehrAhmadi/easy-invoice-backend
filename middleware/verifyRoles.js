const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized , Without any roles",
      });
    }
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) {
      return res.status(403).json({
        statusCode: 403,
        message: "Forbidden , You Dont have permission",
      });
    }
    next();
  };
};

module.exports = verifyRoles


