const express = require("express");
const router = express.Router();
const { checkID } = require("../middlewares");
const { LocalizationKeyValues } = require("../models");
const { localization_key_values_schema: schema } = require("../validation");

router.get("/", async (req, res) => {
	const keyValues = await LocalizationKeyValues.find().populate({
		path: "locale_values",
		populate: {
			path: "language",
		},
	});
	res.send(keyValues);
});

router.get("/:id", checkID, async (req, res) => {
	const { id } = req.params;
	const keyValues = await LocalizationKeyValues.findById(id).populate({
		path: "locale_values",
		populate: {
			path: "language",
		},
	});
	if (!keyValues)
		return res.status(404).send({
			error: `${id} id do not exist in localizationKeyValues collection`,
		});
	res.send(keyValues);
});

router.post("/", async (req, res) => {
	const { value, error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	const keyValue = await LocalizationKeyValues.findOne({ key: value.key });
	if (keyValue) return res.status(404).send({ message: "key already exist" });
	const result = await (
		await LocalizationKeyValues.create(value)
	).populate({
		path: "locale_values",
		populate: {
			path: "language",
		},
	});
	res.send(result);
});

router.put("/:id", checkID, async (req, res) => {
	const { id } = req.params;
	let keyValues = await LocalizationKeyValues.findById(id);
	if (!keyValues)
		return res.status(404).send({
			error: `${id} id do not exist in localizationKeyValues collection`,
		});
	const { value, error } = schema.validate(req.body);
	if (error) return res.status(400).send({ message: error.details[0].message });
	keyValues = await LocalizationKeyValues.findByIdAndUpdate(id, value, {
		new: true,
	}).populate({
		path: "locale_values",
		populate: {
			path: "language",
		},
	});
	res.send(keyValues);
});

router.delete("/:id", checkID, async (req, res) => {
	const { id } = req.params;
	let keyValues = await LocalizationKeyValues.findById(id);
	if (!keyValues)
		return res.status(404).send({
			error: `${id}  id do not exist in localizationKeyValues collection`,
		});
	keyValues = await LocalizationKeyValues.findByIdAndDelete(id, {
		new: true,
	}).populate({
		path: "locale_values",
		populate: {
			path: "language",
		},
	});
	res.status(200).send(keyValues);
});

module.exports = router;
