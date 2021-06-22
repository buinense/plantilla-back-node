"use strict";

const {
	transportesPlantaController,
	tiemposActualesController,
	centrosAcopiosController
} = require("./ingreso.controller");
const logger = require("../../utils/winston.util");

const { validaToken } = require("../../utils/refreshToken.util");

function route(app, globalPathPrefix) {
	logger.info(`ingreso.route`);

	logger.info(`registrando ruta GET: ${globalPathPrefix}/ingreso`);
	app.get(`${globalPathPrefix}/ingreso`, [validaToken], transportesPlantaController);

	logger.info(`registrando ruta POST: ${globalPathPrefix}/tiempo_plantas`);
	app.post(`${globalPathPrefix}/tiempo_plantas`, [validaToken], tiemposActualesController);

	logger.info(`registrando ruta GET: ${globalPathPrefix}/getCentrosAcopios`);
	app.post(`${globalPathPrefix}/getCentrosAcopios`, [validaToken], centrosAcopiosController);
}

module.exports = route;
