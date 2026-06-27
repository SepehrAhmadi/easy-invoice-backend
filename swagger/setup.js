const swaggerJsdoc = require("swagger-jsdoc");
const definition = require("./definition");

const options = {
  definition,
  apis: ["./swagger/docs/**/*.docs.js"],
};

module.exports = swaggerJsdoc(options);
