const {
  unknownEndpointHandler,
} = require("./unknown-endpoint-handler.middleware");
const { checkID } = require("./valid-id-check.middleware");

module.exports = { checkID, unknownEndpointHandler };
