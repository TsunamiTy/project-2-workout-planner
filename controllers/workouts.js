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

// ====NEW====


// ====DELETE====


// ====UPDATE====


// ====CREATE====


// ====EDIT====


// ====SHOW====
workoutRouter.get('/:id', (req, res) => {
    Workout.findById(req.params.id, (err, foundWorkout) => {
        res.render('show.ejs', {
            workout: foundWorkout,
        });
    });
});



// ====EXPORTS====
module.exports = workoutRouter;