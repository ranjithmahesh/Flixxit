const Movie = require("../models/movie.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//UpdateUser
exports.CreateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    const newMove = await Movie(req.body);
    try {
      const savedMove = await newMove.save();
      res.status(201).json(savedMove);
    } catch (error) {
      console.log("CreateMovie", error);
      res.status(500).json(error);
    }
  } else {
    console.log("You are not allowed!");
    res.status(500).json("You are not allowed!");
  }
};

//UpdateMovie
exports.UpdateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const UpdateMove = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(201).json(UpdateMove);
    } catch (error) {
      console.log("UpdateMove", error);
      res.status(500).json(error);
    }
  } else {
    console.log("You are not allowed!");
    res.status(500).json("You are not allowed!");
  }
};
//DeleteMovie
exports.DeleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);

      res.status(201).json("Movie deleted");
    } catch (error) {
      console.log("DeleteMovie", error);
      res.status(500).json(error);
    }
  } else {
    console.log("You are not allowed!");
    res.status(500).json("You are not allowed!");
  }
};

//Get Movie
exports.GetMovie = async (req, res) => {
  try {
    const Getmove = await Movie.findById(req.params.id);

    res.status(200).json(Getmove);
  } catch (error) {
    console.log("GetMovie", error);
    res.status(500).json(error);
  }
};

//Get randomMovie
exports.randomMovie = async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Get AllMovie
exports.GetAllMovies = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};
