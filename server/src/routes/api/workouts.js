const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Exercise = require('../../models/Exercise');
const Workout = require('../../models/Workout');

const router = express.Router();

// @route   GET api/workouts
// @desc    Get user's workouts
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const workouts = await Workout.find({ userId: req.user.id });
		return res.json(workouts);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server error, could not retrieve exercises');
	}
});

// @route   POST api/workouts
// @desc    Create a new workout
// @access  Private
router.post('/', auth, [
	check('name', 'You must specify a name')
		.not().isEmpty().bail().trim().escape(),
	check('exercises', 'You must add at least one exercise')
		.not().isEmpty()
],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, exercises } = req.body;

		const linkName = name.toLowerCase().replace(/\s/g, '-').replace(/,/g, '');

		try {
			const workoutExists = await Workout.findOne({ userId: req.user.id, name });

			if (workoutExists) {
				return res.status(400).json({ errors: [{ msg: 'Workout with that name already exists' }] });
			}

			const newWorkout = new Workout({ name, linkName, exercises, userId: req.user.id });

			await newWorkout.save();
			return res.json(newWorkout);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
