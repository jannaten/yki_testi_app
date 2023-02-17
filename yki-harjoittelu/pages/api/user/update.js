import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../../models';
import { dbConnect, getToken } from '../../../utils';

const { JWT_SECRET_KEY } = process.env;

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'PATCH':
      let decoded_user = {};
      const { token, data, studyWords } = req.body;
      if (!token)
        return res
          .status(401)
          .send({ message: 'ACCESS DENIED: No token provided' });
      try {
        decoded_user = jwt.verify(token, JWT_SECRET_KEY);
      } catch ({ message }) {
        return res.status(400).send({ message: 'INVALID TOKEN' });
      }
      try {
        if (data.username) {
          const duplicatedUsername = await User.find({
            username: data.username,
            _id: { $ne: decoded_user.id }
          });
          if (duplicatedUsername.length > 0)
            return res
              .status(400)
              .send({ message: `${data.username} username already exist` });
        }
        if (data.password?.length > 4) {
          data.password = await bcrypt.hash(data.password, 12);
        } else if (data.password) {
          return res
            .status(400)
            .send({ message: `password should be more than 4 charactors` });
        }
        if (studyWords) {
          const userExist = await User.findById({ _id: decoded_user.id });
          const wordExist = userExist?.studyWords.filter(
            (el) => el.id === data.id
          );
          const user = await User.findByIdAndUpdate(
            { _id: decoded_user.id },
            wordExist[0]
              ? { $pull: { studyWords: data } }
              : { $push: { studyWords: data } },
            { new: true }
          );
          return res.status(200).json({ token: getToken(user) });
        } else {
          const user = await User.findByIdAndUpdate(
            { _id: decoded_user.id },
            { $set: data },
            { new: true }
          );
          return res.status(200).json({ token: getToken(user) });
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
