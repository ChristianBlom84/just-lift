const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	sets: {
		type: Number,
		required: true
	},
	reps: {
		type: Number
	},
	superSet: {
		type: Boolean,
		required: true
	},
	totalReps: {
		type: Number
	},
	progression: {
		type: Number,
		required: true
	},
	notes: {
		type: String
	},
	userId: {
		type: String,
		required: true
	}
});

const Exercise = mongoose.model('exercise', ExerciseSchema);

module.exports = Exercise;
