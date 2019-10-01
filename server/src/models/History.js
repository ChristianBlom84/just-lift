const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
	userId: String,
	finishedWorkouts: [
		{
			workoutId: String,
			name: String,
			linkName: String,
			date: {
				type: Date,
				default: Date.now
			},
			sets: Number,
			reps: Number,
			totalLifted: Number
		}
	]
});

const History = mongoose.model('history', HistorySchema);

module.exports = History;
