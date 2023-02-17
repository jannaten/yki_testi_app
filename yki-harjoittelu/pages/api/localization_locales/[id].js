import { GenericService } from '../../../services';
import { LocalizationLocale } from '../../../models';
import { dbConnect, validateID } from '../../../utils';
import { localization_locale_schema as schema } from '../../../validation';

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req;
  await dbConnect();

  const localizationLocaleService = new GenericService(LocalizationLocale);
  switch (method) {
    case 'GET':
      try {
        if (!validateID(id))
          return res.status(400).send({ message: `${id} is not a valid id` });
        const locale = await localizationLocaleService.getById(id);
        if (!locale)
          return res
            .status(404)
            .send({ message: `${id} id do not exist in locale collection` });
        res.status(200).send(locale);
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;

    case 'PUT':
      try {
        if (!validateID(id))
          return res.status(400).send({ message: `${id} is not a valid id` });
        let locale = await localizationLocaleService.getById(id);
        if (!locale)
          return res
            .status(404)
            .send({ message: `${id} id do not exist in locale collection` });
        const { value, error } = schema.validate(req.body);
        if (error)
          return res.status(400).send({ message: error.details[0].message });
        locale = await localizationLocaleService.update(id, value);
        res.status(200).send(locale);
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;

    case 'DELETE':
      try {
        if (!validateID(id))
          return res.status(400).send({ message: `${id} is not a valid id` });
        let locale = await localizationLocaleService.getById(id);
        if (!locale)
          return res
            .status(404)
            .send({ message: `${id} id do not exist in locale collection` });
        locale = await localizationLocaleService.delete(id);
        res.status(200).send(locale);
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;

    default:
      res.status(500).send({ message: 'Something happened' });
      break;
  }
}
