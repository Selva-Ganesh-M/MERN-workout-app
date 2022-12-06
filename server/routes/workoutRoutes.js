const express = require("express");
const Workouts = require("../models/WorkoutModel");
const {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/WorkoutsController");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

// middlewares
router.use(requireAuth);

// routes
// get all workouts
router.get("/", getAllWorkouts);

// get a single workout
router.get("/:id", getSingleWorkout);

router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);

module.exports = router;
