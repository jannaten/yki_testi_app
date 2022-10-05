const mongoose = require("mongoose");

const localizationLocaleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  locale: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    unique: true,
  },
});

const LocalizationLocale = mongoose.model(
  "Localization_Locale",
  localizationLocaleSchema
);

exports.localizationLocaleSchema = localizationLocaleSchema;
exports.LocalizationLocale = LocalizationLocale;
