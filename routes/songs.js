const express = require("express");
const router = express.Router();

const songsController = require("../controllers/songs");

router.get("/", songsController.getAll);

module.exports = router;
