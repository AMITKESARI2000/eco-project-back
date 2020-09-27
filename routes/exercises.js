const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');

//Show All Exercises
router.route('/').get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Add an Exercise
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json('Exercise added successfully'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Show individual exercise
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Delete an exercise
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise Deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

//Update an exercise
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username
        ? req.body.username
        : exercise.username;
      exercise.description = req.body.description
        ? req.body.description
        : exercise.description;
      exercise.duration = Number(req.body.duration)
        ? Number(req.body.duration)
        : exercise.duration;
      exercise.date = Date.parse(req.body.date)
        ? Date.parse(req.body.date)
        : exercise.date;

      exercise
        .save()
        .then(() => res.json('Exercise Updated!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
