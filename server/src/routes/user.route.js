const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

const { JWT_SECRET_KEY } = process.env;

router.post("/signin", async (req, res) => {
  if (req.body.token) {
    const { clientId, credential } = req.body.token;
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    if (payload?.email_verified === false)
      return res.status(400).send({ error: "email is not varified" });
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      const value = `${payload.given_name}.${payload.family_name}`;
      const hashedPassword = await bcrypt.hash(value, 12);
      const result = await User.create({
        email: payload.email,
        username: value,
        password: hashedPassword,
        full_name: `${payload.given_name} ${payload.family_name}`,
      });
      const token = jwt.sign(
        { email: result.email, id: result._id },
        JWT_SECRET_KEY,
        {
          expiresIn: "10h",
        }
      );
      return res.status(201).json({ result, token });
    } else {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        JWT_SECRET_KEY,
        {
          expiresIn: "10h",
        }
      );
      return res.status(200).json({ result: user, token });
    }
  } else {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: user.email, id: user._id },
      JWT_SECRET_KEY,
      {
        expiresIn: "10h",
      }
    );
    res.status(200).json({ result: user, token });
  }
});

module.exports = router;
