const mongoose = require("mongoose");
const { partOfSpeechs, grammerCases } = require("../../constants");
const { wordLevelType, contentType } = require("../../constants");

const localizationKeyValuesSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 1024,
			unique: true,
		},
		locale_values: [
			{
				name: {
					type: String,
					required: true,
					minlength: 2,
					maxlength: 2048,
				},
				valueType: {
					type: String,
					enum: partOfSpeechs,
					default: partOfSpeechs[0],
				},
				case: {
					type: String,
					enum: grammerCases,
					default: grammerCases[0],
				},
				wordLevel: {
					type: String,
					enum: wordLevelType,
					default: wordLevelType[0],
				},
				content: {
					type: String,
					enum: contentType,
					default: contentType[0],
				},
				description: {
					type: String,
					minlength: 2,
					maxlength: 5000,
				},
				language: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Localization_Locale",
					required: true,
				},
			},
		],
		deletedAt: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

const LocalizationKeyValues = mongoose.model(
	"Localization_Key_Values",
	localizationKeyValuesSchema
);

exports.localizationKeyValuesSchema = localizationKeyValuesSchema;
exports.LocalizationKeyValues = LocalizationKeyValues;
