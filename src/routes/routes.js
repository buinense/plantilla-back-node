"use strict";
const config = require("../config/global");
const globalPathPrefix = config.get("globalPathPrefix");
/* const logger = require("../utils/winston.util");

const swaggerUi = require("swagger-ui-express"); */
/* const swaggerDocument = require("../../swagger.json"); */
const ingresoRoute = require("../components/ingreso/ingreso.route");
const authRoute = require("../components/auth/auth.route");

function routes(app) {
	//app.use(`${globalPathPrefix}/bff-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	// Rutas para cada operación
	ingresoRoute(app, globalPathPrefix);

	authRoute(app, globalPathPrefix);
}

module.exports = { routes };
