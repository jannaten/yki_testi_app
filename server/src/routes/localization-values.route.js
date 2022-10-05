const express = require("express");
const router = express.Router();
const { checkID } = require("../middlewares");
const { GenericService } = require("../services");
const { LocalizationValue } = require("../models");
const { localization_value_schema: schema } = require("../validation");

const localizationValuesService = new GenericService(LocalizationValue);

router.get("/", async (req, res) => {
  const values = await localizationValuesService.getAll();
  res.status(200).send(values);
});

router.get("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  const value = await localizationValuesService.getById(id);
  if (!value)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in value collection` });
  res.status(200).send(value);
});

router.post("/", async (req, res) => {
  const { value: v, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const value = await localizationValuesService.add(v);
  res.status(201).send(value);
});

router.put("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let value = await localizationValuesService.getById(id);
  if (!value)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in value collection` });
  const { value: v, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  value = await localizationValuesService.update(id, value);
  res.status(200).send(keyValue);
});

router.delete("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let value = await localizationValuesService.getById(id);
  if (!value)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in value collection` });
  value = await localizationValuesService.delete(id, value);
  res.status(200).send(value);
});

module.exports = router;
