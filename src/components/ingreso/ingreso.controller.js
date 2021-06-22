"use strict";

const logger = require("../../utils/winston.util");
const { transportesPlantaModule, tiemposActualesModule, centrosAcopiosModule } = require("./ingreso.module");

const transportesPlantaController = async (req, res) => {
	try {
		const resultModule = await transportesPlantaModule();
		logger.info(`[INGRESO - CONTROLLER] Exito al consultar transportes plantas`);
		return res.status(200).send(resultModule);
	} catch (error) {
		logger.error(`[INGRESO - CONTROLLER] Error al consultar transportes plantas ${error}`);

		return res.status(error.code).send(error);
	}
};

const tiemposActualesController = async (req, res) => {
	try {
		const resultModule = await tiemposActualesModule(req);
		logger.info(`[INGRESO - CONTROLLER] Exito al consultar transportes plantas`);
		return res.status(200).send(resultModule);
	} catch (error) {
		let err = typeof error === "object" ? error.response.data : error;
		logger.error(`[INGRESO - CONTROLLER] Error al consultar transportes plantas ${err}`);

		return res.status(error.code).send(error);
	}
};

const centrosAcopiosController = async (req, res) => {
	try {
		const resultModule = await centrosAcopiosModule();
		logger.info(`[INGRESO - CONTROLLER] Exito al consultar centros de acopio`);
		return res.status(200).send(resultModule);
	} catch (error) {
		let err = typeof error === "object" ? error.response.data : error;
		logger.error(`[INGRESO - CONTROLLER] Error al consultar centros de acopio ${err}`);

		return res.status(error.code).send(error);
	}
};

module.exports = {
	transportesPlantaController,
	tiemposActualesController,
	centrosAcopiosController
};
