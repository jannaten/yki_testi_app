const express = require("express");
const router = express.Router();
const { checkID } = require("../middlewares");
const { LocalizationKey } = require("../models");
const { GenericService } = require("../services");
const { localization_key_schema: schema } = require("../validation");

const localizationKeyService = new GenericService(LocalizationKey);

router.get("/", async (req, res) => {
  const keys = await localizationKeyService.getAll();
  res.status(200).send(keys);
});

router.get("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  const key = await localizationKeyService.getById(id);
  if (!key)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in key collection` });
  res.status(200).send(key);
});

router.post("/", async (req, res) => {
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const key = await localizationKeyService.add(value);
  res.status(201).send(key);
});

router.put("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let key = await localizationKeyService.getById(id);
  if (!key)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in key collection` });
  const { value, error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  key = await localizationKeyService.update(id, value);
  res.status(200).send(key);
});

router.delete("/:id", checkID, async (req, res) => {
  const { id } = req.params;
  let key = await localizationKeyService.getById(id);
  if (!key)
    return res
      .status(404)
      .send({ error: `${id} id do not exist in key collection` });
  key = await localizationKeyService.delete(id);
  res.status(200).send(key);
});

module.exports = router;
