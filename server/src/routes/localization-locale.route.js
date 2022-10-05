const express = require("express");
const router = express.Router();
const { checkID } = require("../middlewares");
const { LocalizationLocale } = require("../models");
const { localization_locale_schema: schema } = require("../validation");

router.get("/", async (req, res) => {
  const locales = await LocalizationLocale.find();
  res.status(200).send(locales);
});

router.get("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  const locale = await LocalizationLocale.findById(req.params.id);
  if (!locale)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in locale collection` });
  res.status(200).send(locale);
});

router.post("/", async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  let locale = new LocalizationLocale(value);
  locale = await locale.save();
  res.status(201).send(locale);
});

router.put("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let locale = await LocalizationLocale.findById({ _id: id });
  if (!locale)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in locale collection` });
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  locale = await LocalizationLocale.findByIdAndUpdate(id, value, {
    new: true,
  });
  res.status(200).send(locale);
});

router.delete("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let locale = await LocalizationLocale.findById({ _id: id });
  if (!locale)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in locale collection` });
  locale = await LocalizationLocale.findByIdAndDelete(id, {
    new: true,
  });
  res.status(200).send(locale);
});

module.exports = router;
