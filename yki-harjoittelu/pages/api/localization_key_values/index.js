import { dbConnect } from '../../../utils';
import { LocalizationKeyValues } from '../../../models';
import { localization_key_values_schema as schema } from "../../../validation";

export default async function handler(req, res) {
	const { method } = req;
	await dbConnect()

	switch (method) {
		case 'GET':
			try {
				const keyValues = await LocalizationKeyValues.find().populate({
					path: "locale_values",
					populate: {
						path: "language",
					},
				});
				res.send(keyValues);
			} catch (error) {
				res.status(500).send({ error });
			}
			break
		case 'POST':
			try {
				const { value, error } = schema.validate(req.body);
				if (error) return res.status(400).send({ message: error.details[0].message });
				const keyValue = await LocalizationKeyValues.findOne({ key: value.key });
				if (keyValue) return res.status(404).send({ message: "key already exist" });
				const result = await (
					await LocalizationKeyValues.create(value)
				).populate({
					path: "locale_values",
					populate: {
						path: "language",
					},
				});
				res.send(result);
			} catch (error) {
				res.status(500).send({ error });
			}
			break
		default:
			res.status(500).send({ error: "something happened" });
			break
	}
}