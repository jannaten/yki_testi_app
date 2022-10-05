const mongoose = require("mongoose");

const localizationValueSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
});

const LocalizationValue = mongoose.model(
  "Localization_Value",
  localizationValueSchema
);

exports.localizationValueSchema = localizationValueSchema;
exports.LocalizationValue = LocalizationValue;
