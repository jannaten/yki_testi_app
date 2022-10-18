const Joi = require("joi");
const { partOfSpeechs, grammerCases } = require("../../constants");
const { wordLevelType, contentType } = require("../../constants");

const localization_locale_schema = Joi.object({
  name: Joi.string().min(2).max(50),
  locale: Joi.string().min(2).max(50).required(),
});

const localization_key_values_schema = Joi.object({
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("provide a valid value id"),
  key: Joi.string().min(2).max(1024).required(),
  locale_values: Joi.array()
    .items(
      Joi.object().keys({
        _id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .message("provide a valid value id"),
        name: Joi.string().min(2).max(2048).required(),
        valueType: Joi.string()
          .min(2)
          .max(50)
          .valid(...partOfSpeechs),
        case: Joi.string()
          .min(2)
          .max(50)
          .valid(...grammerCases),
        wordLevel: Joi.string()
          .min(2)
          .max(50)
          .valid(...wordLevelType),
        content: Joi.string()
          .min(2)
          .max(50)
          .valid(...contentType),
        description: Joi.string().min(2).max(5000),
        language: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .message("provide a valid language id")
          .required(),
      })
    )
    .unique((a, b) => a.language === b.language)
    .message({
      "array.unique": "can not have the same language id",
    }),
  deletedAt: Joi.any(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  __v: Joi.any(),
});

module.exports = {
  localization_locale_schema,
  localization_key_values_schema,
};
