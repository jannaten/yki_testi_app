const Joi = require("joi");

const localization_key_schema = Joi.object({
  key: Joi.string().min(2).max(255).required(),
});

const localization_value_schema = Joi.object({
  value: Joi.string().min(2).max(255).required(),
});

const localization_locale_schema = Joi.object({
  name: Joi.string().min(2).max(50),
  locale: Joi.string().min(2).max(50).required(),
});

const localization_locale_value_schema = Joi.object({
  localizationValue: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("provide a valid language id")
    .required(),
  language: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("provide a valid language id")
    .required(),
});

const localization_key_values_schema = Joi.object({
  localization_key: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("provide a valid key id")
    .required(),
  locale_values: Joi.array().items(
    Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("provide a valid value id")
  ),
});

module.exports = {
  localization_key_schema,
  localization_value_schema,
  localization_locale_schema,
  localization_key_values_schema,
  localization_locale_value_schema,
};

// const localization_key_values_schema = Joi.object({
//   key: Joi.string().min(2).max(255),
//   values: Joi.array().items(
//     Joi.object().keys({
//       value: Joi.string().min(2).max(255).required(),
//       locale: Joi.string().min(2).max(50).required(),
//     })
//   ),
// });
