"use strict";

/* TODO: move a @bech/config-parser@4.0.0 */

const logger = require("./winston.util");

// TODO: re implementar funcionalidad de convict, debido a:
//  https://github.com/mozilla/node-convict/issues/29

function addEnvParam(paramName, required, format) {
	// Evaluación del parámetro
	// TODO: type coercion of variables
	let parameter = process.env[paramName];

	if (!format) {
		// Autodetect type
		if (!isNaN(parameter)) format = "Numeric";
		else if (
			parameter === "true" ||
			parameter === "True" ||
			parameter === "TRUE" ||
			parameter === "false" ||
			parameter === "False" ||
			parameter === "FALSE"
		)
			format = "Boolean";
		else format = "String";
	}

	// Parsing Numbers
	if (format === "Numeric") parameter = Number(parameter);
	// https://www.samanthaming.com/tidbits/19-2-ways-to-convert-to-boolean/
	else if (format === "Boolean") parameter = Boolean(parameter);
	// Else stay as string

	if (!parameter) {
		if (required) {
			throw new Error("No se definió la variable de entorno " + paramName);
		} else return null;
	}

	return parameter;
}

function parseVar(origElem) {
	let parsedElem = {};
	const objKeys = Object.keys(origElem);
	if (typeof origElem[objKeys[0]] === "object") {
		// En caso de ser una categoría
		// Se itera por cada sub propiedad
		for (let key of objKeys) {
			parsedElem[key] = parseVar(origElem[key]); // NOTE: recursive call, use with care
		}
	} else if (
		// Evitar eslint: no-prototype-builtins
		Object.prototype.hasOwnProperty.call(origElem, "env") &&
		typeof origElem.env === "string"
	) {
		// En caso de ser una variable de entorno

		const requiredProperty = Object.prototype.hasOwnProperty.call(origElem, "required") && origElem.required;

		const hasDefault = Object.prototype.hasOwnProperty.call(origElem, "default");

		// Si la variable de entorno es obligatoria y tiene un valor por defecto definido
		if (requiredProperty && hasDefault) {
			throw new Error("Las variables de entorno obligatorias no deben tener valores por defecto");
		}

		const format = Object.prototype.hasOwnProperty.call(origElem, "format");
		parsedElem = addEnvParam(origElem.env, requiredProperty, format);

		// !requiredProperty && !process.env[origElem.env] && !hasDefault
		if (!parsedElem) {
			// Si la variable de entorno tiene un valor por defecto definido
			if (hasDefault) {
				// Variable no obligatoria: se usa el valor por defecto
				parsedElem = origElem.default;
			}
		}
	} else if (
		// Si es una variable simple
		Object.prototype.hasOwnProperty.call(origElem, "default")
	) {
		parsedElem = origElem.default;
	}

	return parsedElem;
}

function parseConfig(config) {
	try {
		// Schema.validate(config);
		const parsedConfig = parseVar(config);

		// TODO: implement correctly
		parsedConfig.get = value => {
			return parsedConfig[value];
		};

		return parsedConfig;
	} catch (e) {
		logger.error(e);
		process.exit(1);
	}
}

module.exports = parseConfig;
