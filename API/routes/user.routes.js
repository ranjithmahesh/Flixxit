const router = require("express").Router();

const verify = require("../utility/verifyToken");
const {
  UpdateUser,
  DeleteUser,
  addToLikedMovies,
  getLikedMovies,
  removeLikedMovies,
} = require("../controllers/user.controllers");
//UPDATE

// router.put("/:id", verify, UpdateUser);
router.delete("/:id", verify, DeleteUser);
router.post("/add", verify, addToLikedMovies);
router.get("/liked/:email", verify, getLikedMovies);
router.put("/remove", verify, removeLikedMovies);

module.exports = router;
