const express = require("express");
const router = express.Router();

const songsController = require("../controllers/songs");
const validation = require("../middleware/validate");

router.get("/", songsController.getAllSongs);

router.get("/:id", songsController.getSingleSong);

router.post("/", validation.saveSong, songsController.createSong);

router.put("/:id", validation.saveSong, songsController.updateSong);

router.delete("/:id", songsController.deleteSong);

module.exports = router;
