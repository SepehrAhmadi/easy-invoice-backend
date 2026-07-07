require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const { initSocket } = require("./config/socket");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const logger = require("./utils/logger");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/setup");

const PORT = process.env.PORT || 3500;

// =========== connect to MongoDB ============//
connectDB();

// =========== middleware ============//
// customer loger middleware
app.use(requestLogger);

// handle options credentials check before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// cross origin resource sharing
app.use(cors(corsOptions));

// built in middleware for form data
app.use(express.urlencoded({ extended: false }));

// built in middleware for jsojn
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// built in middleware for static files
app.use("/", express.static(path.join(__dirname, "/public")));

// middleware for uploads file
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========== Swagger ============//
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);

// =========== Routing ============//
app.use("/", require("./routes"));

// =========== 404 ============//
app.all("/*splat", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// =========== error handler ============//
app.use(errorHandler);

mongoose.connection.once("open", () => {
  logger.info("Connected to MongoDB");
  initSocket(server);
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
