const router = require("express").Router();
const {
  CreateMovieList,
  DeleteMovieList,
  GetMovieList,
} = require("../controllers/list.controler");

const verify = require("../utility/verifyToken");

//CREATE

router.post("/", verify, CreateMovieList);

//DELETE

router.delete("/:id", verify, DeleteMovieList);

//GET

router.get("/", verify, GetMovieList);

module.exports = router;
