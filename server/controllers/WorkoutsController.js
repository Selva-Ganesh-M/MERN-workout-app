const mongoose = require("mongoose");
const WorkoutModel = require("../models/WorkoutModel");

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutModel.find({}).sort({ createdAt: -1 });
    if (workouts.length === 0) {
      throw { name: "error", message: "No workouts found", status: "404" };
    }
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await WorkoutModel.create({
      title,
      reps,
      load,
    });
    workout.save();
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw {
        name: "Invalid ID",
        message: "entered id is invalid",
        status: "400",
      };
    }
    const workout = await WorkoutModel.findById(id);
    if (!workout) {
      throw {
        status: 404,
        message: "workout doesn't exist",
      };
    }
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getSingleWorkout,
};
