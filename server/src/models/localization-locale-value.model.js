const mongoose = require("mongoose");

const localizationLocaleValueSchema = new mongoose.Schema({
  localizationValue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Localization_Value",
    required: true,
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Localization_Locale",
    required: true,
  },
});

const LocalizationLocaleValue = mongoose.model(
  "Localization_Locale_Value",
  localizationLocaleValueSchema
);

exports.localizationLocaleValueSchema = localizationLocaleValueSchema;
exports.LocalizationLocaleValue = LocalizationLocaleValue;
