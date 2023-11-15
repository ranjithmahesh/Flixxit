import { Router } from "express";
import {
  CreateMovie,
  DeleteMovie,
  UpdateMovie,
  GetMovieById,
  GetRandomMovie,
  GetAllMovie,
} from "../controllers/movie.controller.js";

import Movie from "../models/movie.model.js";
import verify from "../utility/verifyToken.js";

const router = Router();

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

export default router;
