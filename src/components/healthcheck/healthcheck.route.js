"use strict";
const healthcheckController = require("./healthcheck.controller");

function route(app, globalPathPrefix) {
  app.get(`${globalPathPrefix}/healthcheck`, healthcheckController);
}

module.exports = route;
