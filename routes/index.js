const express = require("express");
const router = express.Router();

router
  .use("/songs", require("./songs"))
  .use("/students", require("./students"));

module.exports = router;
