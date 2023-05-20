const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllStudents = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("MusicClass")
    .collection("Students")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingleStudent = async (req, res, next) => {
  const studentId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("MusicClass")
    .collection("Students")
    .find({ _id: studentId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createStudent = async (req, res) => {
  const student = {
    name: req.body.name,
    instruments: req.body.instruments,
  };
  const response = await mongodb
    .getDb()
    .db("MusicClass")
    .collection("Students")
    .insertOne(student);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the student."
      );
  }
};

const updateStudent = async (req, res) => {
  const studentId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const student = {
    name: req.body.name,
    instruments: req.body.instruments,
  };
  const response = await mongodb
    .getDb()
    .db("MusicClass")
    .collection("Students")
    .replaceOne({ _id: studentId }, student);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating the student."
      );
  }
};

const deleteStudent = async (req, res) => {
  const studentId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("MusicClass")
    .collection("Students")
    .deleteOne({ _id: studentId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting the student."
      );
  }
};

module.exports = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};
