import { LocalizationKeyValues } from '../../../models';
import { dbConnect, validateID } from '../../../utils';
import { localization_key_values_schema as schema } from '../../../validation';

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req;
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        if (!validateID(id))
          return res.status(400).send({ message: `${id} is not a valid id` });
        const keyValues = await LocalizationKeyValues.findById(id).populate({
          path: 'locale_values',
          populate: {
            path: 'language'
          }
        });
        if (!keyValues)
          return res.status(404).send({
            message: `${id} id do not exist in localizationKeyValues collection`
          });
        res.send(keyValues);
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;

    case 'PUT':
      try {
        if (!validateID(id))
          return res.status(400).send({ message: `${id} is not a valid id` });
        let keyValues = await LocalizationKeyValues.findById(id);
        if (!keyValues)
          return res.status(404).send({
            message: `${id} id do not exist in localizationKeyValues collection`
          });
        const { value, error } = schema.validate(req.body);
        if (error)
          return res.status(400).send({ message: error.details[0].message });
        keyValues = await LocalizationKeyValues.findByIdAndUpdate(id, value, {
          new: true
        }).populate({
          path: 'locale_values',
          populate: {
            path: 'language'
          }
        });
        res.send(keyValues);
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;

    case 'DELETE':
      try {
        if (!validateID(id))
          return res.status(400).send({ message: `${id} is not a valid id` });
        let keyValues = await LocalizationKeyValues.findById(id);
        if (!keyValues)
          return res.status(404).send({
            message: `${id}  id do not exist in localizationKeyValues collection`
          });
        keyValues = await LocalizationKeyValues.findByIdAndDelete(id, {
          new: true
        }).populate({
          path: 'locale_values',
          populate: {
            path: 'language'
          }
        });
        res.status(200).send(keyValues);
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;

    default:
      res.status(500).send({ message: 'Something happened' });
      break;
  }
}
