const express = require("express");
const router = express.Router();

router
  .use("/", require("./home"))
  .use("/songs", require("./songs"))
  .use("/students", require("./students"));

module.exports = router;
