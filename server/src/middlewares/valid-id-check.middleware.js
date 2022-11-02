const { validateID } = require("../utils");

function checkID(req, res, next) {
	const id = validateID(req.params.id);
	if (!id)
		return res
			.status(400)
			.send({ error: `${req.params.id} is not a valid id` });
	next();
}

module.exports = { checkID };
