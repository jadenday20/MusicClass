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

module.exports = {
  getAllPractice,
};
