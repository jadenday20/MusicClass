const express = require("express");
const router = express.Router();
console.log("Hi");

router.post("hello");
router
  .use("/", require("./home"))
  .use("/songs", require("./songs"))
  .use("/students", require("./students"));

module.exports = router;
