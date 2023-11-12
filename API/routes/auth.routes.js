const router = require("express").Router();
const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { register, login } = require("../controllers/auth.controller");

router.post("/register", register);
//LOGIN
router.post("/login", login);

module.exports = router;
