// ====DEPENDENCIES====
const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
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
workoutRouter.get('/new', (req, res) => {
    res.render('new');
});
// ====DELETE====
workoutRouter.delete('/:id', (req, res) => {
    Workout.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/workouts');
    });
});

// ====UPDATE====
workoutRouter.put('/:id', (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updateWorkout) => {
            res.redirect(`/workouts/${req.params.id}`)
        }
    )
})

// ====CREATE====
workoutRouter.post('/', (req, res) => {
    Workout.create(req.body, (err, workout) => {
        res.redirect('/workouts');
    });
});


// ====EDIT====
workoutRouter.get('/:id/edit', (req, res) => {
    Workout.findById(req.params.id, (error, foundWorkout) => {
        res.render('edit.ejs', {
            workout: foundWorkout,
        });
    });
});

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