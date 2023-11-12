const User = require("../models/user.model.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//UpdateUser
exports.UpdateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      const updateuser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(201).json(updateuser);
    } catch (error) {
      console.log("Update", error);
      res.status(500).json(error);
    }
  } else {
    console.log("You can update only Your acc");
    res.status(500).json("You can update only Your acc");
  }
};

//DeleteUser
exports.DeleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(201).json("Deleted user....");
    } catch (error) {
      console.log("Delete", error);
      res.status(500).json(error);
    }
  } else {
    console.log("You can Delete only Your acc");
    res.status(500).json("You can Delete only Your acc");
  }
};
exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      console.log("User:", user);
      const { likedMovies } = user;
      console.log("Liked Movies:", likedMovies);
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

      if (!movieAlreadyLiked) {
        user.likedMovies.push(data); // Modify the document in memory
        await user.save(); // Save the modified document

        console.log("Movie added successfully");
        return res.json({ msg: "Movie added successfully" });
      } else {
        console.log("Movie already added to the liked list");
        return res.json({ mess: "Movie already added to the liked list" });
      }
    }

    console.log("User not found");
    return res.status(404).json({ msg: "User not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ movies: user.likedMovies }); // Use 200 OK for success
    } else {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};



exports.removeLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const { likedMovies } = user;
    const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);

    if (movieIndex === -1) {
      console.log("Movie not found");
      return res.status(400).json({ error: "Movie not found" });
    }

    likedMovies.splice(movieIndex, 1);

    // Update the user document with the modified likedMovies array
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { likedMovies }, 
      { new: true }
    );

    if (!updatedUser) {
      console.log("Failed to update user document");
      return res.status(500).json({ error: "Failed to update user document" });
    }

    console.log("Movie removed successfully");
    return res.status(200).json({ msg: "Movie removed successfully" });
  } catch (err) {
    console.error("Error in removeLikedMovies:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
};
