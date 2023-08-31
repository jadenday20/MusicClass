const express = require("express");
const router = express.Router();

router
  .use("/songs", require("./songs"))
  .use("/students", require("./students"))
  .use("/practice", require("./practice"));

module.exports = router;
