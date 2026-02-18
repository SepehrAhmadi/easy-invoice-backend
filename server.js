require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 3500;

// =========== connect to MongoDB ============//
connectDB();

// =========== middleware ============//
// customer loger middleware
app.use(logger);

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

// =========== routing ============//
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
// dropdown api
app.use("/dropdown", require("./routes/api/dropdown/index"));
// base api
app.use("/base/company", require("./routes/api/base/company"));
app.use("/base/brand", require("./routes/api/base/brand"));
app.use("/base/product", require("./routes/api/base/product"));
// operation api
app.use("/operation/invoice", require("./routes/api/operation/invoice"));
app.use("/operation/invoiceItem", require("./routes/api/operation/invoiceItem"));
// report
app.use("/report/packaging", require("./routes/api/report/packaging"));

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
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`server runing on port ${PORT}`));
});
