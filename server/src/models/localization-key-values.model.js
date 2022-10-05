const mongoose = require("mongoose");

const localizationKeyValuesSchema = new mongoose.Schema({
  localization_key: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Localization_Key",
    required: true,
  },
  locale_values: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Localization_Locale_Value",
    },
  ],
});

const LocalizationKeyValues = mongoose.model(
  "Localization_Key_Values",
  localizationKeyValuesSchema
);

exports.localizationKeyValuesSchema = localizationKeyValuesSchema;
exports.LocalizationKeyValues = LocalizationKeyValues;
