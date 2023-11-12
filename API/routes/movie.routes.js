



const router = require("express").Router();
const { CreateMovie, DeleteMovie, UpdateMovie, GetMovieById, GetRandomMovie, GetAllMovie } = require("../controllers/movie.controller");
const Movie = require("../models/movie.model");
const verify = require("../utility/verifyToken");

//CREATE

router.post("/", verify, CreateMovie);

//UPDATE

router.put("/:id", verify, UpdateMovie);

//DELETE

router.delete("/:id", verify, DeleteMovie);

//GET

router.get("/find/:id", verify, GetMovieById);

//GET RANDOM

router.get("/random", verify, GetRandomMovie);

//GET ALL

router.get("/", verify, GetAllMovie);

module.exports = router;