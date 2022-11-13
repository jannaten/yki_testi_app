import mongoose from "mongoose";
import { statusType, userType } from "../constants";

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
		password: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 500,
		},
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
		studyWords: [{ type: Object, required: false }],
		deletedAt: {
			type: Date,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

mongoose.models = {};
const User = mongoose.model('User', userSchema);
export default User;