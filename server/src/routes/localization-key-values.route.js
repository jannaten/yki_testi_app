const express = require("express");
const router = express.Router();
const { checkID } = require("../middlewares");
const { LocalizationKeyValues } = require("../models");
const { localization_key_values_schema: schema } = require("../validation");

router.get("/", async (req, res) => {
  const keyValues = await LocalizationKeyValues.find();
  res.status(200).send(keyValues);
});

router.get("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  const keyValues = await LocalizationKeyValues.findById(id)
    .populate("localization_key")
    .populate({
      path: "locale_values",
      populate: {
        path: "language localizationValue",
      },
    });
  if (!keyValues)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in key vlaues collection` });
  res.status(200).send(keyValues);
});

router.post("/", async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  let keyValues = new LocalizationKeyValues(value);
  keyValues = await keyValues.save();
  res.status(201).send(keyValues);
});

router.put("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let keyValues = await LocalizationKeyValues.findById({ _id: id });
  if (!keyValues)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in key vlaues collection` });
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  keyValues = await LocalizationKeyValues.findByIdAndUpdate(id, value, {
    new: true,
  });
  res.status(200).send(keyValues);
});

router.delete("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let keyValues = await LocalizationKeyValues.findById({ _id: id });
  if (!keyValues)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in key vlaues collection` });
  keyValues = await LocalizationKeyValues.findByIdAndDelete(id, {
    new: true,
  });
  res.status(200).send(keyValues);
});

module.exports = router;
