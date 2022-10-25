const path = require("path");
const express = require("express");
const usersRoute = require("../routes/user.route");
const { unknownEndpointHandler } = require("../middlewares");
const localizationLocaleRoute = require("../routes/localization-locale.route");
const localizationKeyValuesRoute = require("../routes/localization-key-values.route");
// const { errorLogger } = require("../utils");

module.exports = function (app) {
  const BASE = "/api";
  app.use(express.static("public"));
  app.use(`${BASE}/users`, usersRoute);
  app.use(`${BASE}/localization_locales`, localizationLocaleRoute);
  app.use(`${BASE}/localization_key_values`, localizationKeyValuesRoute);
  app.use(express.static(path.join(__dirname, "../../build")));
  app.get("*", function (req, res) {
    res.sendFile(
      path.join(__dirname, "../../build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
  app.use(unknownEndpointHandler);
  // app.use(errorLogger);
};
