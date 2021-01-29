const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);


// eslint-disable-next-line no-undef
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);
// eslint-disable-next-line no-undef
winston.info(process.env.NODE_ENV);

module.exports = server;
