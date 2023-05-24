const express = require("express");
const router = express.Router();

const studentsController = require("../controllers/students");
const validation = require("../middleware/validate");

router.get("/", studentsController.getAllStudents);

router.get("/:id", studentsController.getSingleStudent);

router.post("/", validation.saveStudent, studentsController.createStudent);

router.put("/:id", validation.saveStudent, studentsController.updateStudent);

router.delete("/:id", studentsController.deleteStudent);

module.exports = router;
