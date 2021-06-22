"use strict";

const logger = require("../../utils/winston.util");
const { poolPromise, sql } = require("../../utils/connectDB.util");

const transportesPlantaService = async () => {
	try {
		const pool = await poolPromise;
		const user = await pool
			.request()
			.query(
				"SELECT ID,RUT_CHOFER,DV_CHOFER,NOMBRE_CHOFER,APELLIDO_CHOFER,RUT_PRODUCTOR,DV_PRODUCTOR,RAZON_SOCIAL,GUIA,PATENTE,dbo.calcularTiempo(HORA_LLEGADA, GETDATE(), 2) HORA_LLEGADA,HORA_SALIDA, OBJETIVO_VISITA_ID, PORTERIA_ID FROM access_control where isnull(HORA_SALIDA,'') = ''"
			);
		/* console.log(user); */
		return user.recordset;
	} catch (error) {
		logger.error("[INGRESO - SERVICE] Ejecución incorrecta del servicio transportesPlantaService", error);

		throw typeof error === "object" ? error.response.data : error;
	}
};

const tiemposActualesService = async req => {
	try {
		const pool = await poolPromise;
		const tiempos = await pool
			.request()
			.input("CENTRO_ACOPIO", sql.Int, req.body.centro_acopio)
			.execute("RC_PROC_C_GET_TIEMPOS_CAMIONES");
		//console.log('getTiemposActuales', tiempos.recordset);
		return tiempos.recordset;
	} catch (error) {
		logger.error("[INGRESO - SERVICE] Ejecución incorrecta del servicio tiemposActuales", error);

		throw typeof error === "object" ? error.response.data : error;
	}
};

const centrosAcopiosService = async () => {
	try {
		const pool = await poolPromise;
		const tiempos = await pool.request().execute("RC_PROC_C_GET_CENTRO_ACOPIO");
		//console.log('getTiemposActuales', tiempos.recordset);
		return tiempos.recordset;
	} catch (error) {
		logger.error("[INGRESO - SERVICE] Ejecución incorrecta del servicio centrosAcopiosService", error);

		throw typeof error === "object" ? error.response.data : error;
	}
};

module.exports = {
	transportesPlantaService,
	tiemposActualesService,
	centrosAcopiosService
};
