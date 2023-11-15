import { Router } from "express";
import {
  CreateMovieList,
  DeleteMovieList,
  GetMovieList,
} from "../controllers/list.controler.js";

import verify from "../utility/verifyToken.js";

const router = Router();

//CREATE

router.post("/", verify, CreateMovieList);

//DELETE

router.delete("/:id", verify, DeleteMovieList);

//GET

router.get("/", verify, GetMovieList);

export default router;
