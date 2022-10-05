const express = require("express");
const router = express.Router();
const { checkID } = require("../middlewares");
const { LocalizationLocaleValue } = require("../models");
const { localization_locale_value_schema: schema } = require("../validation");

router.get("/", async (req, res) => {
  const locale_value = await LocalizationLocaleValue.find()
    .populate("localizationValue")
    .populate("language");
  res.status(200).send(locale_value);
});

router.get("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  const locale_value = await LocalizationLocaleValue.findById(req.params.id)
    .populate("localizationValue")
    .populate("language");
  if (!locale_value)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in locale value collection` });
  res.status(200).send(locale_value);
});

router.post("/", async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  let locale_value = new LocalizationLocaleValue(value);
  locale_value = await locale_value.save();
  res.status(201).send(locale_value);
});

router.put("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let locale_value = await LocalizationLocaleValue.findById({ _id: id });
  if (!locale_value)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in locale value collection` });
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  locale_value = await LocalizationLocaleValue.findByIdAndUpdate(id, value, {
    new: true,
  });
  res.status(200).send(locale_value);
});

router.delete("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let locale_value = await LocalizationLocaleValue.findById({ _id: id });
  if (!locale_value)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in locale value collection` });
  locale_value = await LocalizationLocaleValue.findByIdAndDelete(id, {
    new: true,
  });
  res.status(200).send(locale_value);
});

module.exports = router;
