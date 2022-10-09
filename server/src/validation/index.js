const Joi = require("joi");

const localization_locale_schema = Joi.object({
  name: Joi.string().min(2).max(50),
  locale: Joi.string().min(2).max(50).required(),
});

const localization_key_values_schema = Joi.object({
  key: Joi.string().min(2).max(1024).required(),
  locale_values: Joi.array()
    .items(
      Joi.object().keys({
        name: Joi.string().min(2).max(1024).required(),
        valueType: Joi.string()
          .min(2)
          .max(50)
          .valid(
            ...[
              "nouns",
              "adjectives",
              "verbs",
              "pronouns",
              "Adverbs",
              "Numbers",
            ]
          ),
        case: Joi.string()
          .min(2)
          .max(50)
          .valid(
            ...[
              "nominatiivi",
              "genetiivi",
              "akkusatiivi",
              "partitiivi",
              "inessiivi",
              "elatiivi",
              "illatiivi",
              "adessiivi",
              "ablatiivi",
              "allatiivi",
              "essiivi",
              "translatiivi",
              "instruktiivi",
              "abessiivi",
              "komitatiivi",
            ]
          ),
        wordLevel: Joi.string()
          .min(2)
          .max(50)
          .valid(
            ...["beginners", "intermediate", "advanced", "spoken", "official"]
          ),
        stringType: Joi.string()
          .min(2)
          .max(50)
          .valid(...["word", "sentense"]),
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
});

module.exports = {
  localization_locale_schema,
  localization_key_values_schema,
};
