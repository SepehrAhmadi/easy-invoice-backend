const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (req.url.startsWith("/uploads")) {
    return next();
  }

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        statusCode: 401,
        message: "Invalid token",
      });
    }
    req.user = decoded.UserInfo.username;
    req.user = decoded.UserInfo.userId;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
