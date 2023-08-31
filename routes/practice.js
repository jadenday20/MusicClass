const express = require("express");
const router = express.Router();

const practiceController = require("../controllers/practice");
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

router.get("/:id", practiceController.getAllPractice);
router.put(
  "/:id",
  authenticated,
  validation.savePractice,
  practiceController.addPractice
);

module.exports = router;
