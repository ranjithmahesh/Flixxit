const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, defaut: "" },
    isAdmin: { type: Boolean, default: false },
    likedMovies: Array,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
