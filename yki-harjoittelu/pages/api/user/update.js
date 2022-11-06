import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../models";
import { dbConnect } from "../../../utils";

const { JWT_SECRET_KEY } = process.env;

export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case 'PATCH':
			let decoded_user = {};
			const { token, data } = req.body;
			if (!token)
				return res.status(401).send({ message: "ACCESS DENIED: No token provided" });
			try {
				decoded_user = jwt.verify(token, JWT_SECRET_KEY);
			} catch ({ message }) {
				return res.status(400).send({ message: "INVALID TOKEN" });
			}
			try {
				if (data.username) {
					const duplicatedUsername = await User.find({ username: data.username, _id: { $ne: decoded_user.id } });
					if (duplicatedUsername.length > 0)
						return res.status(400).send({ message: `${data.username} username already exist` });
				}
				if (data.password?.length > 4) {
					data.password = await bcrypt.hash(data.password, 12);
				} else if (data.password) {
					return res.status(400).send({ message: `password should be more than 4 charactors` });
				}
				const user = await User.findByIdAndUpdate({ _id: decoded_user.id, }, { $set: data }, { new: true });
				const token = jwt.sign(
					{
						id: user._id,
						type: user.type,
						email: user.email,
						status: user.status,
						username: user.username,
						full_name: user.full_name,
					},
					JWT_SECRET_KEY,
					{
						expiresIn: "10h",
					}
				);
				return res.status(200).json({ token });
			} catch ({ message }) {
				res.status(500).send({ message });
			}
			break
		default:
			res.status(400).json({ message: false })
			break
	}
}
