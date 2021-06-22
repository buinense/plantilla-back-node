"use strict";

function getResponseFormat(resultCode, message, data) {
	return {
		code: resultCode, // tripleta de salida, en caso de ser necesaria
		message: message,
		result: data
	};
}

module.exports = getResponseFormat;
