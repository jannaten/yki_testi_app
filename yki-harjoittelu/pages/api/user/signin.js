import bcrypt from 'bcrypt';
import { User } from '../../../models';
import { dbConnect, getToken, randomString } from '../../../utils';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        if (req.body.token) {
          if (req.body.platform === 'fire_base_google') {
            const { displayName, email, emailVerified, isAnonymous } =
              req.body.token;
            if (emailVerified === false)
              return res.status(400).send({ message: 'email is not varified' });
            if (isAnonymous === true)
              return res.status(400).send({ message: 'user is anonymous' });
            const value = displayName
              ?.split('\n')[0]
              ?.replaceAll(' ', '.')
              ?.toLowerCase();
            const user = await User.findOne({ email });
            if (!user) {
              const hashedPassword = await bcrypt.hash(value, 12);
              const result = await User.create({
                email,
                full_name: displayName,
                password: hashedPassword,
                username: `${value}${randomString(5)}`
              });
              return res.status(201).json({ token: getToken(result) });
            } else {
              return res.status(200).json({ token: getToken(user) });
            }
          } else if (req.body.platform === 'facebook') {
            const { name, email } = req.body.token;
            const user = await User.findOne({ email });
            if (!user) {
              const value = name
                ?.split('\n')[0]
                ?.replaceAll(' ', '.')
                ?.toLowerCase();
              const hashedPassword = await bcrypt.hash(value, 12);
              const result = await User.create({
                email,
                password: hashedPassword,
                username: `${value}${randomString(5)}`,
                full_name: name
              });
              return res.status(201).json({ token: getToken(result) });
            } else {
              return res.status(200).json({ token: getToken(user) });
            }
          }
        } else {
          const { email, password } = req.body;
          const user = await User.findOne({ email });
          if (!user)
            return res.status(404).json({ message: "User doesn't exist" });
          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Invalid credentials' });
          return res.status(200).json({ token: getToken(user) });
        }
      } catch ({ message }) {
        res.status(500).send({ message });
      }
      break;
    default:
      res.status(500).send({ message: 'something happend' });
      break;
  }
}
