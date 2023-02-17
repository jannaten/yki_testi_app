import jwt from 'jsonwebtoken';
import { User } from '../../../models';
import { dbConnect } from '../../../utils';

const { JWT_SECRET_KEY } = process.env;

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      let decoded_user = {};
      // const token = req.headers['x-auth-token'];
      const token = req.body['x-auth-token'];
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
        const user = await User.findOne({ _id: decoded_user.id }, '-password');
        if (!user)
          return res.status(404).json({ message: "User doesn't exist" });
        return res.send(user);
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;
    default:
      res.status(400).json({ message: false });
      break;
  }
}
