const express = require("express");
const router = express.Router();
const { checkID } = require("../middlewares");
const { LocalizationValue } = require("../models");
const { localization_value_schema: schema } = require("../validation");

router.get("/", async (req, res) => {
  const values = await LocalizationValue.find();
  res.status(200).send(values);
});

router.get("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  const value = await LocalizationValue.findById(req.params.id);
  if (!value)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in value collection` });
  res.status(200).send(value);
});

router.post("/", async (req, res) => {
  const { value: v, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  let value = new LocalizationValue(v);
  value = await value.save();
  res.status(201).send(value);
});

router.put("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let value = await LocalizationValue.findById({ _id: id });
  if (!value)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in value collection` });
  const { value: v, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  value = await LocalizationValue.findByIdAndUpdate(id, v, {
    new: true,
  });
  res.status(200).send(keyValue);
});

router.delete("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let value = await LocalizationValue.findById({ _id: id });
  if (!value)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in value collection` });
  value = await LocalizationValue.findByIdAndDelete(id, {
    new: true,
  });
  res.status(200).send(value);
});

module.exports = router;
