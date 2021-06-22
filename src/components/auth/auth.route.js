"use strict";

const { createTokenController } = require("./auth.controller");
/* const getValidarHeaders = require("../../utils/validarHeaders.util"); */
const { validarSchemaCreateToken, formatearSchema } = require("./auth.validationSchema");
/* const { validaToken } = require("../../utils/refreshToken.util"); */

const logger = require("../../utils/winston.util");

function route(app, globalPathPrefix) {
	logger.info(`auth.route`);

	/* const validarHeaders = getValidarHeaders(); */

	logger.info(`registrando ruta POST: ${globalPathPrefix}/create_token`);
	app.post(`${globalPathPrefix}/create_token`, [validarSchemaCreateToken(), formatearSchema], createTokenController);
}

module.exports = route;
