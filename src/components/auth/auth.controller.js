"use strict";

/* const { createToken } = require("../../utils/refreshToken.util"); */
const logger = require("../../utils/winston.util");
const { createTokenModule } = require("./auth.module");

const createTokenController = async (req, res) => {
	try {
		const token = await createTokenModule(req.body);
		logger.info(`[AUTH - CONTROLLER] Exito al crear token`);

		return res.status(200).send(token);
	} catch (error) {
		logger.error(`[AUTH - CONTROLLER] Error al crear token ${error}`);

		return res.status(error.code).send(error);
	}
};

module.exports = {
	createTokenController
};
