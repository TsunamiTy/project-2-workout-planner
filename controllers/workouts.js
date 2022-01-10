// ====DEPENDENCIES====
const express = require('express');
const workoutRouter = express.Router();
const Workout = require('../models/workout');

// ====SEED===
const workoutSeed = require('../models/workoutSeed');
workoutRouter.get('/seed', (req, res) => {
    Workout.deleteMany({}, (error, allWorkouts) => { });

    Workout.create(workoutSeed, (error, data) => {
        res.redirect('/workouts');
    }
    )
})

// ====INDEX====
workoutRouter.get('/', (req, res) => {
    Workout.find({}, (err, workouts) => {
        res.render('index', { workouts });
    });
});

// ====EXPORTS====
module.exports = workoutRouter;