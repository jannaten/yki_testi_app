const express = require("express");
const router = express.Router();
const { checkID } = require("../middlewares");
const { GenericService } = require("../services");
const { LocalizationLocale } = require("../models");
const { localization_locale_schema: schema } = require("../validation");

const localizationLocaleService = new GenericService(LocalizationLocale);

router.get("/", async (req, res) => {
	const locales = await localizationLocaleService.getAll();
	res.status(200).send(locales);
});

router.get("/:id", checkID, async (req, res) => {
	const { id } = req.params;
	const locale = await localizationLocaleService.getById(id);
	if (!locale)
		return res
			.status(404)
			.send({ error: `${id} id do not exist in locale collection` });
	res.status(200).send(locale);
});

router.post("/", async (req, res) => {
	const { value, error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const locale = await localizationLocaleService.add(value);
	res.status(201).send(locale);
});

router.put("/:id", checkID, async (req, res) => {
	const { id } = req.params;
	let locale = await localizationLocaleService.getById(id);
	if (!locale)
		return res
			.status(404)
			.send({ error: `${id} id do not exist in locale collection` });
	const { value, error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	locale = await localizationLocaleService.update(id, value);
	res.status(200).send(locale);
});

router.delete("/:id", checkID, async (req, res) => {
	const { id } = req.params;
	let locale = await localizationLocaleService.getById(id);
	if (!locale)
		return res
			.status(404)
			.send({ error: `${id} id do not exist in locale collection` });
	locale = await localizationLocaleService.delete(id);
	res.status(200).send(locale);
});

module.exports = router;
