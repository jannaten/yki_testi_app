import jwt from 'jsonwebtoken';
import { Word } from '../../../../models';
import { dbConnect } from '../../../../utils';

const { JWT_SECRET_KEY } = process.env;

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      let decoded_user = {};
      const { token, data, operation } = req.body;
      if (!token)
        return res
          .status(401)
          .send({ message: 'ACCESS DENIED: No token provided' });
      decoded_user = jwt.verify(token, JWT_SECRET_KEY);
      const userId = decoded_user.id;
      try {
        if (operation === 'add_or_modify') {
          const existingWord = await Word.findOne({
            wordId: data.id,
            userId
          });
          if (existingWord) {
            await existingWord.remove();
            return res.status(200).json({ word: existingWord, task: 'remove' });
          }
          const newWord = new Word({
            wordId: data.id,
            userId
          });
          await newWord.save();
          return res.status(201).json({ word: newWord, task: 'add' });
        } else if (operation === 'increment') {
          const word = await Word.findOneAndUpdate(
            { wordId: data.id, userId },
            { $inc: { count: 1 } },
            { new: true }
          );
          if (word) {
            if (word.count === 10) {
              word.type = 'memorized';
              await word.save();
            }
            return res.status(200).json({ word, task: 'update' });
          } else return res.status(404).json({ message: 'Word not found' });
        } else if (operation === 'decrement') {
          const word = await Word.findOne({ wordId: data.id, userId });
          if (!word) return res.status(404).json({ message: 'Word not found' });
          if (word.count === 0)
            return res.status(200).json({ word, task: 'nothing' });
          word.count -= 1;
          await word.save();
          return res.status(200).json({ word, task: 'update' });
        }
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;
    default:
      res.status(400).json({ message: false });
      break;
  }
}
