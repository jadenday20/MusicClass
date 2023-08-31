const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllPractice = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid student id to find practice.");
  }
  const studentId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db("MusicClass")
      .collection("Students")
      .find({ _id: studentId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch {
    res.status(400).json({ message: err });
  }
};

const addPractice = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid student id to find practice.");
  }
  const studentId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const minutes = req.body.practice;
  const response = await mongodb
    .getDb()
    .db("MusicClass")
    .collection("Students")
    .updateOne(
      { _id: studentId },
      {
        $set: {
          practice: { "8/21/2023": minutes },
        },
      }
    );
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

module.exports = {
  getAllPractice,
  addPractice,
};
