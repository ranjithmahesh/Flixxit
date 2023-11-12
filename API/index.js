const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const authRoute = require("./routes/auth.routes.js");
const userRoute = require("./routes/user.routes.js");
const movieRoute = require("./routes/movie.routes.js");
const ListRoute = require("./routes/List.routes.js");

const app = express();
PORT = process.env.PORT || 5001;
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

// app.use("/i", (req, res) => {
//   res.json({ message: "tdvhbj" });
// });

app.use(
  cors({
    origin: ["https://deploy-mern-lwhq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", ListRoute);

app.listen(PORT, () => {
  console.log(`connected to ${PORT} port `);
});
