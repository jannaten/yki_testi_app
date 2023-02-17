// import { createClient } from 'redis';
import mongoose from 'mongoose';
import { dbConnect } from '../../../utils';
import { LocalizationKeyValues } from '../../../models';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();
  switch (method) {
    case 'POST':
      try {
        if (!req.body) return [];
        const objectIdArray = req.body.map((el) => mongoose.Types.ObjectId(el.id));
        const keyValues = await LocalizationKeyValues.find({
          _id: { $in: objectIdArray }
        }).populate({
          path: 'locale_values',
          populate: {
            path: 'language'
          }
        });
        return res.send(keyValues);
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;
    default:
      res.status(500).send({ message: 'something happened' });
      break;
  }
}
