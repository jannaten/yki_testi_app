import mongoose from 'mongoose'

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
	deletedAt: {
		type: Date,
		default: null,
	},

}, 
{
	timestamps: true,
}
)

mongoose.models = {};
const LocalizationLocale = mongoose.model('Localization_Locale', localizationLocaleSchema);
export default LocalizationLocale;