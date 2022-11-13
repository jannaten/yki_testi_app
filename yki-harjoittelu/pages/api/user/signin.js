import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../models";
import { dbConnect, randomString } from "../../../utils";

const { JWT_SECRET_KEY } = process.env;

export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'POST':
			try {
				if (req.body.token) {
					if (req.body.platform === "fire_base_google") {
						const { displayName, email, emailVerified, isAnonymous } = req.body.token;
						if (emailVerified === false)
							return res.status(400).send({ message: "email is not varified" });
						if (isAnonymous === true)
							return res.status(400).send({ message: "user is anonymous" });
						const value = displayName?.split("\n")[0]?.replaceAll(" ", ".")?.toLowerCase();
						const user = await User.findOne({ email });
						if (!user) {
							const hashedPassword = await bcrypt.hash(value, 12);
							const result = await User.create({
								email,
								full_name: displayName,
								password: hashedPassword,
								username: `${value}${randomString(5)}`,
							});
							const token = jwt.sign(
								{
									id: result._id,
									type: result.type,
									email: result.email,
									status: result.status,
									username: result.username,
									full_name: result.full_name,
									studyWords: result.studyWords,
								},
								JWT_SECRET_KEY,
								{
									expiresIn: "10h",
								}
							);
							return res.status(201).json({ token });
						} else {
							const token = jwt.sign(
								{
									id: user._id,
									type: user.type,
									email: user.email,
									status: user.status,
									username: user.username,
									full_name: user.full_name,
									studyWords: user.studyWords,
								},
								JWT_SECRET_KEY,
								{
									expiresIn: "10h",
								}
							);
							return res.status(200).json({ token });
						}
					} else if (req.body.platform === "facebook") {
						const { name, email } = req.body.token;
						const user = await User.findOne({ email });
						if (!user) {
							const value = name?.split("\n")[0]?.replaceAll(" ", ".")?.toLowerCase();
							const hashedPassword = await bcrypt.hash(value, 12);
							const result = await User.create({
								email,
								password: hashedPassword,
								username: `${value}${randomString(5)}`,
								full_name: name,
							});
							const token = jwt.sign(
								{
									id: result._id,
									type: result.type,
									email: result.email,
									status: result.status,
									username: result.username,
									full_name: result.full_name,
									studyWords: result.studyWords,
								},
								JWT_SECRET_KEY,
								{
									expiresIn: "10h",
								}
							);
							return res.status(201).json({ token });
						} else {
							const token = jwt.sign(
								{
									id: user._id,
									type: user.type,
									email: user.email,
									status: user.status,
									username: user.username,
									full_name: user.full_name,
									studyWords: user.studyWords,
								},
								JWT_SECRET_KEY,
								{
									expiresIn: "10h",
								}
							);
							return res.status(200).json({ token });
						}
					}
				} else {
					const { email, password } = req.body;
					const user = await User.findOne({ email });
					if (!user) return res.status(404).json({ message: "User doesn't exist" });
					const isPasswordCorrect = await bcrypt.compare(password, user.password);
					if (!isPasswordCorrect)
						return res.status(400).json({ message: "Invalid credentials" });
					const token = jwt.sign(
						{
							id: user._id,
							type: user.type,
							email: user.email,
							status: user.status,
							username: user.username,
							full_name: user.full_name,
							studyWords: user.studyWords,
						},
						JWT_SECRET_KEY,
						{
							expiresIn: "10h",
						}
					);
					return res.status(200).json({ token });
				}
			} catch ({ message }) {
				res.status(500).send({ message });
			}
			break
		default:
			res.status(500).send({ message: "something happend" });
			break
	}
}
