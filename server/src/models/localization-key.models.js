const mongoose = require("mongoose");

const localizationKeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    unique: true,
  },
});

const LocalizationKey = mongoose.model(
  "Localization_Key",
  localizationKeySchema
);

exports.localizationKeySchema = localizationKeySchema;
exports.LocalizationKey = LocalizationKey;
