const express = require("express");
const router = express.Router();
const { checkID } = require("../middlewares");
const { LocalizationKey } = require("../models");
const { localization_key_schema: schema } = require("../validation");

router.get("/", async (req, res) => {
  console.log("I am here");
  const keys = await LocalizationKey.find();
  res.status(200).send(keys);
});

router.get("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  const key = await LocalizationKey.findById(id);
  if (!key)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in key collection` });
  res.status(200).send(key);
});

router.post("/", async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  let key = new LocalizationKey(value);
  key = await key.save();
  res.status(201).send(key);
});

router.put("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let key = await LocalizationKey.findById({ _id: id });
  if (!key)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in key collection` });
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  key = await LocalizationKey.findByIdAndUpdate(id, value, {
    new: true,
  });
  res.status(200).send(key);
});

router.delete("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let key = await LocalizationKey.findById({ _id: id });
  if (!key)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in key collection` });
  key = await LocalizationKey.findByIdAndDelete(id, {
    new: true,
  });
  res.status(200).send(key);
});

module.exports = router;
