const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Get all workouts");
});
router.get("/:id", (req, res) => {
  res.json("Get a single workout");
});
router.post("/", (req, res) => {
  res.json("post one workout");
});
router.delete("/:id", (req, res) => {
  res.json("Delete one workout.");
});
router.patch("/:id", (req, res) => {
  res.json("Update one workout");
});

module.exports = router;
