const express = require("express");
const routes = express.Router();

routes.use("/songs", require("./songs"));

module.exports = routes;
