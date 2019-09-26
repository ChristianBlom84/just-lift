const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	linkName: {
		type: String
	},
	category: {
		type: String,
		required: true
	},
	categoryLinkName: {
		type: String,
		required: true
	},
	categoryId: {
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
	nextStartWeight: {
		type: Number
	},
	notes: {
		type: String
	},
	history: [
		{
			date: Date,
			sets: Number,
			reps: Number,
			weight: Number,
			totalLifted: Number,
		}
	],
	userId: {
		type: String,
		required: true
	}
});

const Exercise = mongoose.model('exercise', ExerciseSchema);

module.exports = Exercise;
