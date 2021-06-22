"use strict";

const parseConfig = require("../utils/parseConfig.util");

const config = parseConfig({
	globalPathPrefix: {
		doc: "path base del microservicio",
		default: "/back/v1/node-dockers"
	},
	ConfigSQL: {
		doc: "Credenciales conexión a BD MSSQL",
		default: {
			/* user: 'control_acceso',
        password: 'R@nco2020.,',
        server: '192.168.1.15', */
			user: "control_acceso",
			password: "#Ranoc2020.,2022",
			server: "192.168.1.14",
			database: "Control_Ingreso_Planta",
			options: {
				trustedConnection: true,
				encrypt: true,
				enableArithAbort: true,
				trustServerCertificate: true
			}
		}
	},
	secret: {
		doc: "secret",
		default: "wajaesunseco"
	},
	/* cabeceras: {
		doc: "listado de cabeceras obligatorias para todas las operaciones",
		default: [
			"codigosesion",
			"xtrackid",
			"authorization",
			"canal",
			"nombreaplicacion",
			"funcionalidad",
			"artefacto",
			"etapa",
			"operacion",
			"url",
			"codigoaplicacion",
			"user-agent",
			"rutcliente",
			"dvcliente"
		]
	}, */
	env: {
		doc: "variable de entorno de la aplicación",
		env: "NODE_ENV",
		required: true
	},
	port: {
		doc: "puerto de aplicación",
		env: "PORT",
		required: true
	},
	NodeTlsRejectUnauthorized: {
		doc: "",
		env: "NODE_TLS_REJECT_UNAUTHORIZED",
		required: false
	},
	/* creditos_web_api: {
		env: "URL_CREDITOS_WEB_API",
		required: true
	}, */
	loggerlevel: {
		doc: "",
		env: "LOGGERLEVEL"
	}
});

module.exports = config;
