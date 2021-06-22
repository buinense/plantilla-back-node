"use strict";

const { createToken } = require("../../utils/refreshToken.util");
const logger = require("../../utils/winston.util");
const getResponseFormat = require("../../utils/response.util");

const createTokenModule = async body => {
	try {
		const token = await createToken(body);
		logger.info(`[AUTH - MODULE] Exito al crear token`);

		return getResponseFormat(200, "OK", token);
	} catch (error) {
		logger.error(`[AUTH - MODULE] Error al crear token ${error}`);

		throw typeof error === "object"
			? getResponseFormat(error.code, error.message, error.result)
			: getResponseFormat(500, "NOK", "Internal server error");
	}
};

module.exports = {
	createTokenModule
};
