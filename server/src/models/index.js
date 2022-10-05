const { LocalizationKeyValues } = require("./localization-key-values.model");
const { LocalizationLocale } = require("./localization-locale.model");
const { LocalizationValue } = require("./localization-value.model");
const { LocalizationKey } = require("./localization-key.models");
const {
  LocalizationLocaleValue,
} = require("./localization-locale-value.model");

module.exports = {
  LocalizationKey,
  LocalizationValue,
  LocalizationLocale,
  LocalizationKeyValues,
  LocalizationLocaleValue,
};
