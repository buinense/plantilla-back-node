"use strict";

const getResponseFormat = require("./response.util");

let headers = ["authorization"];

function getValidaHeaders(customHeaders) {
	if (customHeaders && Array.isArray(customHeaders)) headers = customHeaders;
	return validarHeaders;
}

async function validarHeaders(req, res, next) {
	for (let h of headers) {
		if (!req.headers[h]) {
			return res.status(400).send(getResponseFormat(400, "Bad Request", "Parámetros del headers o body inválidos"));
		}
	}

	next();
}

module.exports = getValidaHeaders;
