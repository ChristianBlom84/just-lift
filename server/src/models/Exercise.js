const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
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
			date: {
				type: Date,
				default: Date.now,
			},
			sets: [
				{
					set: Number,
					done: Boolean,
					reps: Number,
				}
			],
			totalReps: Number,
			weight: Number,
			allRepsCompleted: Boolean,
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
