require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const server = express();
const workoutsRouter = require("./routes/workoutRoutes");

server.use(cors());
server.use(express.json());

server.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

server.use("/api/workouts", workoutsRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    server.listen(process.env.PORT, () => {
      console.log("db connected & server is started at " + process.env.PORT);
    })
  )
  .catch((err) => console.log(err.message));
