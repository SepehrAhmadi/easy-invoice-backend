const { Server } = require("socket.io");
const corsOptions = require("./corsOptions");
const logger = require("../utils/logger");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: corsOptions.origin,
      credentials: corsOptions.credentials,
      optionsSuccessStatus: corsOptions.optionsSuccessStatus,
    },
  });

  io.on("connection", (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    socket.on("disconnect", (reason) => {
      logger.info(`Socket disconnected: ${socket.id} - Reason: ${reason}`);
    });

    socket.on("error", (err) => {
      logger.error({
        message: err.message,
        stack: err.stack,
        socketId: socket.id,
      });
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    const err = new Error("Socket.io has not been initialized.");

    logger.error({
      message: err.message,
      stack: err.stack,
      method: "getIO",
    });

    throw err;
  }

  return io;
};

module.exports = {
  initSocket,
  getIO,
};
