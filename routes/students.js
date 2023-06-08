const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/students");
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

router.get("/", studentsController.getAllStudents);

router.get("/:id", studentsController.getSingleStudent);

router.post(
  "/",
  authenticated,
  validation.saveStudent,
  studentsController.createStudent
);

router.put(
  "/:id",
  authenticated,
  validation.saveStudent,
  studentsController.updateStudent
);

router.delete("/:id", authenticated, studentsController.deleteStudent);

module.exports = router;
