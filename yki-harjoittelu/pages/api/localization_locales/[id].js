import { GenericService } from '../../../services';
import { LocalizationLocale } from '../../../models';
import { dbConnect, validateID } from '../../../utils';
import { localization_locale_schema as schema } from "../../../validation";

export default async function handler(req, res) {
	const { query: { id }, method } = req;
	await dbConnect();

	const localizationLocaleService = new GenericService(LocalizationLocale);
	switch (method) {
		case 'GET':
			try {
				if (!validateID(id))
					return res
						.status(400)
						.send({ error: `${id} is not a valid id` });
				const locale = await localizationLocaleService.getById(id);
				if (!locale)
					return res
						.status(404)
						.send({ error: `${id} id do not exist in locale collection` });
				res.status(200).send(locale);
			} catch (error) {
				res.status(500).send({ error });
			}
			break

		case 'PUT':
			try {
				if (!validateID(id))
					return res
						.status(400)
						.send({ error: `${id} is not a valid id` });
				let locale = await localizationLocaleService.getById(id);
				if (!locale)
					return res
						.status(404)
						.send({ error: `${id} id do not exist in locale collection` });
				const { value, error } = schema.validate(req.body);
				if (error) return res.status(400).send({ message: error.details[0].message });
				locale = await localizationLocaleService.update(id, value);
				res.status(200).send(locale);
			} catch (error) {
				res.status(500).send({ error });
			}
			break

		case 'DELETE':
			try {
				if (!validateID(id))
					return res
						.status(400)
						.send({ error: `${id} is not a valid id` });
				let locale = await localizationLocaleService.getById(id);
				if (!locale)
					return res
						.status(404)
						.send({ error: `${id} id do not exist in locale collection` });
				locale = await localizationLocaleService.delete(id);
				res.status(200).send(locale);
			} catch (error) {
				res.status(500).send({ error });
			}
			break

		default:
			res.status(500).send({ error: "Something happened" });
			break
	}
}

