const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	linkName: {
		type: String,
		required: true
	},
	exercises: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'exercise'
		}
	],
	notes: String,
	history: [
		{
			date: {
				type: Date,
				default: Date.now,
			},
			sets: Number,
			reps: Number,
			totalLifted: Number,
			notes: String
		}
	],
	userId: {
		type: String,
		required: true
	}
})

const Workout = mongoose.model('workout', WorkoutSchema);

module.exports = Workout;
