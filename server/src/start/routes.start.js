const express = require("express");
const { unknownEndpointHandler } = require("../middlewares");
const localizationKeyRoute = require("../routes/localization-key.route");
const localizationLocaleRoute = require("../routes/localization-locale.route");
const localizationValuesRoute = require("../routes/localization-values.route");
const localizationKeyValuesRoute = require("../routes/localization-key-values.route");
const localizationLocaleValueRoute = require("../routes/localization-locale-value.route");
// const { errorLogger } = require("../utils");

module.exports = function (app) {
  const BASE = "/api";
  app.use(express.static("public"));
  app.use(`${BASE}/localization_keys`, localizationKeyRoute);
  app.use(`${BASE}/localization_locales`, localizationLocaleRoute);
  app.use(`${BASE}/localization_values`, localizationValuesRoute);
  app.use(`${BASE}/localization_key_values`, localizationKeyValuesRoute);
  app.use(`${BASE}/localization_locale_value`, localizationLocaleValueRoute);
  app.use(unknownEndpointHandler);
  // app.use(errorLogger);
};
