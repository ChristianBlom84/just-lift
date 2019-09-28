const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Exercise = require('../../models/Exercise');
const Workout = require('../../models/Workout');

const router = express.Router();

// @route   POST api/history
// @desc    Add history from a completed workout
// @access  Private
router.post('/', auth, [
	check('workout', 'You must include a valid workout')
		.not().isEmpty()
		.custom((value, { req }) => new Promise(async (resolve, reject) => {
			const workout = await Workout.findById(req.body.workout._id);
			if (!workout) reject(workout);
			resolve(workout);
		})),
	check('workoutData', 'You must include at least one valid exercise')
		.not().isEmpty()
		.custom((value, { req }) => Object.values(req.body.workoutData).map(async (exercise) => {
			const exerciseEntry = await Exercise.findById(exercise.id);
			if (!exerciseEntry) throw new Error("Exercise doesn't exist");
		}))
],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Workout history
		const { workout, notes } = req.body;

		const workoutData = Object.values(req.body.workoutData);

		const additiveReducer = (accumulator, currentValue) => accumulator + currentValue;

		const booleanReducer = (accumulator, currentValue) => (accumulator && currentValue) === true;

		console.log(workout, workoutData);

		let totalRepsWorkout = 0;
		let totalSets = 0;
		const totalLiftedWorkout = workoutData.map((currentExercise) => {
			const exerciseReps = currentExercise.sets
				.map((set) => set.done ? set.reps : 0)
				.reduce(additiveReducer)
			totalRepsWorkout += exerciseReps;
			totalSets += currentExercise.sets.length;
			return exerciseReps * currentExercise.weight;
		})
			.reduce(additiveReducer);

		const workoutHistory = {
			sets: totalSets,
			reps: totalRepsWorkout,
			totalLifted: totalLiftedWorkout,
			notes,
		}

		const exerciseHistory = workoutData.map((exercise, exerciseIndex) => {
			if (exercise.superSet === true) {
				const { sets, weight } = exercise;
				const totalRepsSuperSet = exercise.sets.map((set) => {
					return set.done ? set.reps : 0;
				})
					.reduce(additiveReducer);
				const allRepsCompleted = totalRepsSuperSet >= exercise.totalRepsSuperSet;
				const totalLifted = totalRepsSuperSet * weight;

				return { sets, totalReps: totalRepsSuperSet, weight, allRepsCompleted, totalLifted };
			}

			const { sets, weight } = exercise;
			const totalReps = exercise.sets.map((set) => {
				return set.done ? set.reps : 0;
			})
				.reduce(additiveReducer);
			const allRepsCompleted = sets.map((set) => {
				return set.reps >= workout.exercises[exerciseIndex].reps && set.done === true;
			})
				.reduce(booleanReducer);
			const totalLifted = totalReps * weight;

			return { sets, totalReps, weight, allRepsCompleted, totalLifted };
		})

		try {
			const workoutEntry = await Workout.findById(workout._id);
			workoutEntry.history.push(workoutHistory);

			await workoutEntry.save();

			const exerciseModels = await Promise.all(workoutData.map(async (exercise) => {
				const entry = await Exercise.findById(exercise.id);
				return entry;
			}));

			exerciseModels.forEach((model, index) => {
				const exerciseToSave = model;
				exerciseToSave.history.push(exerciseHistory[index]);
				if (exerciseHistory[index].allRepsCompleted === true) {
					exerciseToSave.nextStartWeight = exerciseHistory[index].weight + exerciseToSave.progression;
				}
				exerciseToSave.save();
			})

			return res.status(200).json({ workoutEntry, exerciseModels });
		} catch (err) {
			// console.error(err.message);
			return res.status(500).send('Server error, could not save workout data.');
		}
	}
)

module.exports = router;
