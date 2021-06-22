const sql = require("mssql");
const config = require("../config/global");
const logger = require("../utils/winston.util");
/* const credenciales = config.get("ConfigSQL"); */
/* console.log("credenciales", credenciales); */
const poolPromise = new sql.ConnectionPool(config.get("ConfigSQL"))
	.connect()
	.then(pool => {
		logger.info("Conectado a MSSQL");
		return pool;
	})
	.catch(err => {
		logger.error("Conexión a Base de Datos Falló! Bad Config: ", err);
		throw typeof err === "object" ? err.response.data : err;
	});

module.exports = {
	sql,
	poolPromise
};
