import User from "../models/user.model.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";



//Register
export const register = async (req, res) => {
  try {
    const encryptedPassword = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: encryptedPassword,
    });

    const user = await newUser.save();

    res.status(201).json(user);
  } catch (err) {
    console.error("Registration failed:", err.message);

    if (err.code === 11000) {
      return res.status(409).json("User with this email already exists");
    }

    res.status(500).json("Registration failed. Please try again.");
  }
};
// login
export const login = async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("Wrong email or password!");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong email or password!");
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
