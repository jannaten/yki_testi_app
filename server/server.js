require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { logger } = require("./src/utils");
const app = express();

require("./src/start/middlewares.start")(app);
require("./src/start/routes.start")(app);
require("./src/start/mongoose.start")();

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  logger.info(`listening to port ${PORT}`);
});

module.exports = server;
