const express = require("express");
const Workouts = require("../models/WorkoutModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Get all workouts");
});
router.get("/:id", (req, res) => {
  res.json("Get a single workout");
});
router.post("/", async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workouts.create({
      title,
      reps,
      load,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.delete("/:id", (req, res) => {
  res.json("Delete one workout.");
});
router.patch("/:id", (req, res) => {
  res.json("Update one workout");
});

module.exports = router;
