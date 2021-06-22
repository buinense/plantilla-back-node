"use strict";

const getResponseFormat = require("../../utils/response.util");
const logger = require("../../utils/winston.util");
const { transportesPlantaService, tiemposActualesService, centrosAcopiosService } = require("./ingreso.service");

const transportesPlantaModule = async () => {
	try {
		let serviceResponse = await transportesPlantaService();
		logger.info(`[INGRESO - MODULE] Éxito al consultar transportes plantas`);
		return getResponseFormat(200, "OK", serviceResponse);
	} catch (error) {
		/* let errorFormat = typeof error === "object" ? JSON.stringify(error) : error;
		logger.error(`[INGRESO - MODULE Error ${errorFormat} ]`); */
		throw typeof error === "object"
			? getResponseFormat(error.code, error.message, error.result)
			: getResponseFormat(500, "NOK", "Internal server error");
	}
};

const tiemposActualesModule = async req => {
	try {
		let serviceResponse = await tiemposActualesService(req);
		logger.info(`[INGRESO - MODULE] Éxito al consultar tiempos actuales`);
		return getResponseFormat(200, "OK", serviceResponse);
	} catch (error) {
		/* let errorFormat = typeof error === "object" ? JSON.stringify(error) : error;
		logger.error(`[INGRESO - MODULE Error ${errorFormat} ]`); */
		throw typeof error === "object"
			? getResponseFormat(error.code, error.message, error.result)
			: getResponseFormat(500, "NOK", "Internal server error");
	}
};

const centrosAcopiosModule = async () => {
	try {
		let serviceResponse = await centrosAcopiosService();
		logger.info(`[INGRESO - MODULE] Éxito al consultar centros de acopio`);
		return getResponseFormat(200, "OK", serviceResponse);
	} catch (error) {
		/* let errorFormat = typeof error === "object" ? JSON.stringify(error) : error;
		logger.error(`[INGRESO - MODULE Error ${errorFormat} ]`); */
		throw typeof error === "object"
			? getResponseFormat(error.code, error.message, error.result)
			: getResponseFormat(500, "NOK", "Internal server error");
	}
};

module.exports = {
	transportesPlantaModule,
	tiemposActualesModule,
	centrosAcopiosModule
};
