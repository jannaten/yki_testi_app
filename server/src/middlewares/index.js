const {
  unknownEndpointHandler,
} = require("./unknown-endpoint-handler.middleware");
const { checkID } = require("./valid-id-check.middleware");
const { auth } = require("./auth.middleware");

module.exports = { checkID, unknownEndpointHandler, auth };
