const express = require("express");
const routes = express.Router();

routes
  .use("/songs", require("./songs"))
  .use("/students", require("./students"));

module.exports = routes;
