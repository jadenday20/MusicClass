const express = require("express");
const router = express.Router();

const songsController = require("../controllers/songs");
const validation = require("../middleware/validate");
const authenticated = (req, res, next) => {
  try {
    if (req.session.token) {
      next();
    } else {
      throw new Error("Please Log In");
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

router.get("/", songsController.getAllSongs);

router.get("/:id", songsController.getSingleSong);

router.post(
  "/",
  authenticated,
  validation.saveSong,
  songsController.createSong
);

router.put(
  "/:id",
  authenticated,
  validation.saveSong,
  songsController.updateSong
);

router.delete("/:id", authenticated, songsController.deleteSong);

module.exports = router;
