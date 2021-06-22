"use strict";

async function healthcheck(req, res) {
  return res.status(200).send("OK");
}

module.exports = healthcheck;
