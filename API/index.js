import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import movieRoute from "./routes/movie.routes.js";
import ListRoute from "./routes/List.routes.js";
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/health", (req, res) => {
  res.json({ message: "tdvhbj" });
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", ListRoute);

app.listen(PORT, () => {
  console.log(`connected to ${PORT} port `);
});
