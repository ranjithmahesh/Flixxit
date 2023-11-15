import { Router } from "express";
import verify from "../utility/verifyToken.js";
import {
  UpdateUser,
  DeleteUser,
  addToLikedMovies,
  getLikedMovies,
  removeLikedMovies,
} from "../controllers/user.controllers.js";

const router = Router();

//UPDATE

// router.put("/:id", verify, UpdateUser);
router.delete("/:id", verify, DeleteUser);
router.post("/add", verify, addToLikedMovies);
router.get("/liked/:email", verify, getLikedMovies);
router.put("/remove", verify, removeLikedMovies);

export default router;
