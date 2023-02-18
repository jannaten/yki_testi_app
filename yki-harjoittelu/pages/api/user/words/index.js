import jwt from 'jsonwebtoken';
import { Word } from '../../../../models';
import { dbConnect } from '../../../../utils';

export default async function handler(req, res) {
  const { method } = req;
  let decoded_user = {};
  const { token } = req.body;
  if (!token)
    return res
      .status(401)
      .send({ message: 'ACCESS DENIED: No token provided' });
  decoded_user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decoded_user.id;
  await dbConnect();
  switch (method) {
    case 'POST':
      try {
        const keyValues = await Word.find({ userId }).populate({
          path: 'wordId',
          populate: {
            path: 'locale_values',
            populate: {
              path: 'language'
            }
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
