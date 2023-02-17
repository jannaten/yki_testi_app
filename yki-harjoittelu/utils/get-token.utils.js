import jwt from 'jsonwebtoken';
const { JWT_SECRET_KEY } = process.env;

export const getToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      type: user.type,
      email: user.email,
      status: user.status,
      username: user.username,
      full_name: user.full_name,
      studyWords: user.studyWords
    },
    JWT_SECRET_KEY,
    {
      expiresIn: '10h'
    }
  );
