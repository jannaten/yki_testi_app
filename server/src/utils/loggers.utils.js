const winston = require("winston");
// const winstonDailyRotate = require("winston-daily-rotate-file");
const expressWinston = require("express-winston");

const isProduction = process.env.NODE_ENV === "production";
// const logsFolder = process.env.LOG_FOLDER || "./logs";
const transports = [
  new winston.transports.Console({
    format: winston.format.simple(),
    timestamp: true,
  }),
];

// if (isProduction) {
//   transports.push(
//     new winston.transports.File({
//       filename: logsFolder + "/errors.log",
//       level: "error",
//     })
//   );

//   transports.push(
//     new winstonDailyRotate({
//       filename: logsFolder + "/%DATE%.log",
//       datePattern: "YYYY-MM-DD",
//       maxFiles: isProduction ? "14d" : "3d",
//       level: "info",
//     })
//   );
// }

const logger = winston.createLogger({
  level: isProduction ? "info" : "silly",
  exitOnError: false,
  format: winston.format.printf(({ message, level }) => {
    return JSON.stringify({
      time: new Date().toISOString(),
      logger: level,
      message,
    });
  }),
  transports: transports,
});

const requestLogger = expressWinston.logger({
  transports,
  format: winston.format.printf(({ message, meta }) => {
    return JSON.stringify({
      time: new Date().toISOString(),
      logger: "request",
      message,
      meta,
    });
  }),
  level: "info",
  meta: true,
  msg: "{{res.statusCode}} {{req.method}} {{req.url}}",
  requestWhitelist: [],
  responseWhitelist: [],
  //   dynamicMeta: (req, res) => ({
  //     ...getMetaData(req),
  //   }),
});

const errorLogger = expressWinston.errorLogger({
  transports,
  format: winston.format.printf(({ message, meta }) => {
    return JSON.stringify({
      time: new Date().toISOString(),
      logger: "error",
      message,
      meta,
    });
  }),
  level: "error",
  meta: true,
  msg: "{{err.message}}",
  blacklistedMetaFields: [
    "level",
    "exception",
    "date",
    "process",
    "os",
    "trace",
  ],
  // dynamicMeta: (req, res) => ({
  //   ...getMetaData(req),
  // }),
});

module.exports = { logger, requestLogger, errorLogger };
