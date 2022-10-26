const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const { requestLogger } = require("../utils");

module.exports = function (app) {
  app.use(cors());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(express.json());
  // app.use(requestLogger);
  app.use(express.urlencoded({ extended: true }));
  if (app.get("env") == "production") {
    app.use(
      morgan("common", {
        skip: function (req, res) {
          return res.statusCode < 400;
        },
        stream: __dirname + "/../morgan.log",
      })
    );
  } else {
    app.use(morgan("dev"));
  }
};
