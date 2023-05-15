import NodeCache from 'node-cache';
import { dbConnect } from '../../../utils';
import { LocalizationKeyValues } from '../../../models';

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'GET':
      try {
        const { pageNumber, pageSize } = req.query;
        const cacheKey = `localizationKeyValuesPaginate?pageNumber=${pageNumber}&pageSize=${pageSize}`;
        const cachedData = cache.get(cacheKey);
        if (cachedData !== undefined) {
          const cachedResponse = JSON.parse(cachedData);
          return res.send(cachedResponse);
        }
        const keyValues = await LocalizationKeyValues.find()
          .skip((pageNumber - 1) * pageSize)
          .limit(pageSize)
          .populate({
            path: 'locale_values',
            populate: {
              path: 'language'
            }
          });
        const totalCount = await LocalizationKeyValues.countDocuments({});
        const response = { data: keyValues, count: totalCount };
        cache.set(cacheKey, JSON.stringify(response));
        return res.send(response);
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;
    default:
      res.status(500).send({ message: 'something happened' });
      break;
  }
}