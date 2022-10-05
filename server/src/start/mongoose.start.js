const mongoose = require("mongoose");
const { logger } = require("../utils");

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DATABASE } =
  process.env;

const mongooseOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = function () {
  mongoose
    .connect(
      `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority`,
      mongooseOption
    )
    .then(() => logger.info("Connected to the database"))
    .catch((err) => logger.error(err.message));
};
