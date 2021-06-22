"use strict";

const jwt = require("jsonwebtoken");
const moment = require("moment");
const { secret } = require("../config/global");
const getResponseFormat = require("./response.util");

/**
 * createToken
 * Método para crear token
 * debe recibir parametro user
 * @param {object} user
 * @returns
 */
const createToken = async user => {
	try {
		const payload = {
			sub: user._id,
			username: user.username,
			email: user.email,
			iat: moment().unix(), //Guardamos la fecha en formato unix
			exp: moment()
				.add(1, "days")
				.unix() //Agregamos 1 hora para expiracion
		};
		const token = await jwt.sign(payload, secret);
		return token;
	} catch (error) {
		console.log("token", error);
		return error;
	}
};

const validaToken = async (req, res, next) => {
	/* console.log("req.headers", req.headers); */
	const token = req.headers.Authorization || req.headers.authorization;
	if (!token) {
		return res.status(403).send(getResponseFormat(403, "Bad Request", "Sin cabecera de autenticacion"));
	}

	const cleanToken = token.replace(/['"]+/g, "");

	const payload = jwt.decode(cleanToken);

	if (payload.exp <= moment().unix()) {
		return res.status(401).send(getResponseFormat(401, "Bad Token", "Token expirado"));
	}

	jwt.verify(cleanToken, secret, err => {
		if (err)
			return res
				.status(403)
				.send(getResponseFormat(403, "Bad Token", "No tiene los privilegios necesarios para acceder"));
	});

	return next();
};

module.exports = {
	createToken,
	validaToken
};
