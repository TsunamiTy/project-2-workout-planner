const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    equipment: { type: String, required: true },
    reps: { type: [Number] },
    sets: { type: [Number] }, 
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;