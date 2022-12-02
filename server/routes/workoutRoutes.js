const express = require("express");
const Workouts = require("../models/WorkoutModel");
const {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
} = require("../controllers/WorkoutsController");
console.log(typeof getAllWorkouts);

const router = express.Router();

// routes
// get all workouts
router.get("/", getAllWorkouts);

// get a single workout
router.get("/:id", getSingleWorkout);

router.post("/", createWorkout);
router.delete("/:id", (req, res) => {
  res.json("Delete one workout.");
});
router.patch("/:id", (req, res) => {
  res.json("Update one workout");
});

module.exports = router;
