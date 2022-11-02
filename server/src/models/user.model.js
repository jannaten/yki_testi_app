const mongoose = require("mongoose");
const { statusType, userType } = require("../../constants");

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, minlength: 2, maxlength: 50 },
		full_name: { type: String, required: true, minlength: 2, maxlength: 128 },
		email: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 128,
			unique: true,
		},
		password: { type: String, required: true },
		status: {
			type: String,
			enum: statusType,
			default: statusType[0],
		},
		type: {
			type: String,
			required: true,
			enum: userType,
			default: userType[0],
		},
		deletedAt: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

exports.userSchema = userSchema;
exports.User = User;
