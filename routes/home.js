const express = require("express");
const router = express.Router();
const homecontroller = require("../controllers/home");

router.get("/", homecontroller.homeRoute);

module.exports = router;
