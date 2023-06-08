const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllSongs = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("MusicClass")
      .collection("Songs")
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
  // mongodb
  //   .getDb()
  //   .db("MusicClass")
  //   .collection("Songs")
  //   .find()
  //   .toArray((err, lists) => {
  //     console.log("problem");
  //     if (err) {
  //       res.status(400).json({ message: err });
  //     }
  //     res.setHeader("Content-Type", "application/json");
  //     res.status(200).json(lists);
  //   });
};

const getSingleSong = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid song id to find a contact.");
  }
  const songId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db("MusicClass")
      .collection("Songs")
      .find({ _id: songId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch {
    res.status(400).json({ message: err });
  }
  // mongodb
  //   .getDb()
  //   .db("MusicClass")
  //   .collection("Songs")
  //   .find({ _id: songId })
  //   .toArray((err, result) => {
  //     if (err) {
  //       res.status(400).json({ message: err });
  //     }

  //     res.setHeader("Content-Type", "application/json");
  //     res.status(200).json(lists[0]);
  //   });
};

const createSong = async (req, res) => {
  const song = {
    name: req.body.name,
    featuredIn: req.body.featuredIn,
    composer: req.body.composer,
    arranger: req.body.arranger,
    lyricist: req.body.lyricist,
    year: req.body.year,
    key: req.body.key,
  };
  const response = await mongodb
    .getDb()
    .db("MusicClass")
    .collection("Songs")
    .insertOne(song);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the song.");
  }
};

const updateSong = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid song id to find a contact.");
  }
  const songId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const song = {
    name: req.body.name,
    featuredIn: req.body.featuredIn,
    composer: req.body.composer,
    arranger: req.body.arranger,
    lyricist: req.body.lyricist,
    year: req.body.year,
    key: req.body.key,
  };
  const response = await mongodb
    .getDb()
    .db("MusicClass")
    .collection("Songs")
    .replaceOne({ _id: songId }, song);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the song.");
  }
};

const deleteSong = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid song id to find a contact.");
  }
  const songId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("MusicClass")
    .collection("Songs")
    .deleteOne({ _id: songId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the song.");
  }
};

module.exports = {
  getAllSongs,
  getSingleSong,
  createSong,
  updateSong,
  deleteSong,
};
