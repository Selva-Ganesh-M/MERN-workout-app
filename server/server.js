require("dotenv").config();

const { application } = require("express");
const express = require("express");
const server = express();
const workoutsRouter = require("./routes/workouts");

server.use(express.json());

server.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

server.use("/api/workouts", workoutsRouter);

server.listen(process.env.PORT, () => {
  console.log("server is started at " + process.env.PORT);
});
