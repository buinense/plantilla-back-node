const { body, validationResult } = require("express-validator");
const getResponseFormat = require("../../utils/response.util");

const validarSchemaCreateToken = () => {
	return [
		body("_id")
			.not()
			.isEmpty()
			.isString()
			.isLength({ min: 5 }),
		body("username")
			.not()
			.isEmpty()
			.isString()
			.isLength({ min: 5 }),
		body("email")
			.not()
			.isEmpty()
			.isEmail()
			.normalizeEmail()
			.isLength({ min: 5 })
	];
};

const formatearSchema = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		return next();
	}

	return res.status(400).send(getResponseFormat(400, "Bad Request", "Parámetros del headers o body inválidos"));
};

module.exports = { validarSchemaCreateToken, formatearSchema };
