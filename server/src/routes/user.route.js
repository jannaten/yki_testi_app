const express = require("express");
const axios = require("axios");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { auth } = require("../middlewares");
const { OAuth2Client } = require("google-auth-library");
const { randomString, errorLogger } = require("../utils");

const { JWT_SECRET_KEY } = process.env;

router.get("/token", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }, "-password");
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    res.send(user);
  } catch (err) {
    errorLogger(err);
    res.status(500).send(err);
  }
});

router.post("/signin", async (req, res) => {
  if (req.body.token) {
    if (req.body.platform === "goolge") {
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
        const value = `${payload?.given_name?.toLowerCase()}.${payload?.family_name?.toLowerCase()}`;
        const hashedPassword = await bcrypt.hash(value, 12);
        const result = await User.create({
          email: payload.email,
          password: hashedPassword,
          username: `${value}${randomString(5)}`,
          full_name: `${payload.given_name} ${payload.family_name}`,
        });
        const token = jwt.sign(
          {
            id: result._id,
            type: result.type,
            email: result.email,
            status: result.status,
            username: result.username,
            full_name: result.full_name,
          },
          JWT_SECRET_KEY,
          {
            expiresIn: "10h",
          }
        );
        return res.status(201).json({ result, token });
      } else {
        const token = jwt.sign(
          {
            id: user._id,
            type: user.type,
            email: user.email,
            status: user.status,
            username: user.username,
            full_name: user.full_name,
          },
          JWT_SECRET_KEY,
          {
            expiresIn: "10h",
          }
        );
        return res.status(200).json({ result: user, token });
      }
    } else if (req.body.platform === "facebook") {
      const respond = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${req.body.token}`
      );
      const user = await User.findOne({ email: respond.data.email });
      if (!user) {
        const value = respond?.data?.name
          ?.split("\n")[0]
          ?.replaceAll(" ", ".")
          ?.toLowerCase();
        const hashedPassword = await bcrypt.hash(value, 12);
        const result = await User.create({
          email: respond.data.email,
          password: hashedPassword,
          username: `${value}${randomString(5)}`,
          full_name: respond.data.name,
        });
        const token = jwt.sign(
          {
            id: result._id,
            type: result.type,
            email: result.email,
            status: result.status,
            username: result.username,
            full_name: result.full_name,
          },
          JWT_SECRET_KEY,
          {
            expiresIn: "10h",
          }
        );
        return res.status(201).json({ result, token });
      } else {
        const token = jwt.sign(
          {
            id: user._id,
            type: user.type,
            email: user.email,
            status: user.status,
            username: user.username,
            full_name: user.full_name,
          },
          JWT_SECRET_KEY,
          {
            expiresIn: "10h",
          }
        );
        return res.status(200).json({ result: user, token });
      }
    }
  } else {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      {
        id: user._id,
        type: user.type,
        email: user.email,
        status: user.status,
        username: user.username,
        full_name: user.full_name,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: "10h",
      }
    );
    res.status(200).json({ result: user, token });
  }
});

module.exports = router;
