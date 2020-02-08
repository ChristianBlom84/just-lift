const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Exercise = require('../../models/Exercise');
const Workout = require('../../models/Workout');
const linkNameTransform = require('../../utility/linkNameTransform');

const router = express.Router();

// @route   GET api/workouts
// @desc    Get user's workouts
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const workouts = await Workout.find({ userId: req.user.id }).populate('exercises');
		return res.json(workouts);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server error, could not retrieve workouts');
	}
});

// @route   GET api/workouts/:workoutId
// @desc    Get a single workout
// @access  Private
router.get('/:workoutId', auth, async (req, res) => {
	try {
		const workout = await Workout.find({ userId: req.user.id, _id: req.params.id }).populate('exercises');
		return res.json(workout);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server error, could not retrieve workout');
	}
});

// @route   POST api/workouts
// @desc    Create a new workout
// @access  Private
router.post('/', auth, [
	check('name', 'You must specify a name')
		.not().isEmpty().bail().trim().escape(),
	check('exercises', 'You must add at least one exercise')
		.not().isEmpty(),
	check('notes')
		.optional().trim().escape()
],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, exercises, notes } = req.body;

		const linkName = linkNameTransform(name);

		try {
			const workoutExists = await Workout.findOne({ userId: req.user.id, name });

			if (workoutExists) {
				return res.status(400).json({ errors: [{ msg: 'Workout with that name already exists' }] });
			}

			const newWorkout = new Workout({ name, linkName, exercises, notes, userId: req.user.id });

			await newWorkout.save();
			return res.json(newWorkout);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route   PUT api/workouts/:workoutId
// @desc    Update an existing workout
// @access  Private
router.put('/:workoutId', auth, [
	check('name')
		.optional().trim().escape(),
	check('notes')
		.optional().trim().escape(),
],
	async (req, res) => {
		// @TODO Implement this!
		return res.status(501).send("Feature not implemented yet.");
	}
)

module.exports = router;
