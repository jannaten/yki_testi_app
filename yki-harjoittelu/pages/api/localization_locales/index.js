// import { createClient } from 'redis';
import { dbConnect } from '../../../utils';
import { GenericService } from '../../../services';
import { LocalizationLocale } from '../../../models';
import { localization_locale_schema as schema } from "../../../validation";

export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();
	// const DEFAULT_EXPIRATION = 360;
	// const client = createClient({ url: process.env.REDIS_ENDPOINT_URI, password: process.env.REDIS_AUTH });
	// client.on('error', (err) => console.log('Redis Client Error', err));
	// await client.connect();

	const localizationLocaleService = new GenericService(LocalizationLocale);
	switch (method) {
		case 'GET':
			try {
				// const localeCache = await client.get('localization_locale');
				// if (localeCache != null) {
				// 	return res.send(JSON.parse(localeCache));
				// } else {
				const locales = await localizationLocaleService.getAll();
				// client.setEx('localization_locale', DEFAULT_EXPIRATION, JSON.stringify(locales));
				return res.status(200).send(locales);
				// }
			} catch (error) {
				res.status(500).send({ error });
			}
			break
		case 'POST':
			try {
				const { value, error } = schema.validate(req.body);
				if (error) return res.status(400).send({ message: error.details[0].message });
				const locale = await localizationLocaleService.add(value);
				return res.status(201).send(locale);
			} catch (error) {
				res.status(500).send({ error });
			}
			break
		default:
			res.status(500).send({ error: "something happened" });
			break
	}
}