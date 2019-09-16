const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Exercise = require('../../models/Exercise');

const router = express.Router();

// @route   GET api/exercises
// @desc    Get users exercises
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const exercises = await Exercise.find({ userId: req.user.id });
		return res.json(exercises);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server error, could not retrieve exercises');
	}
});

// @route   POST api/exercises
// @desc    Create a new exercise
// @access  Private
router.post('/', auth, [
	check('name', 'You must specify a name')
		.not().isEmpty().bail().trim().escape(),
	check('category', 'You must specify a category')
		.not().isEmpty().bail().trim().escape(),
	check('sets', 'Sets must be a number of 1 or more')
		.not().isEmpty().bail().isNumeric().toInt(),
	check('reps', 'Reps must be a number of 1 or more')
		.optional({ nullable: true }).isNumeric().toInt(),
	check('superSet')
		.toBoolean(),
	check('totalReps')
		.optional({ nullable: true })
		.if(check('reps').isNumeric())
		.isNumeric().toInt(),
	check('progression', 'Progression must be a non-negative number')
		.not().isEmpty().bail().isNumeric().toFloat(),
	check('notes')
		.trim().escape()
],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			name,
			category,
			sets,
			reps,
			superSet,
			totalReps,
			progression,
			notes
		} = req.body;

		const exerciseFields = {
			userId: req.user.id,
			name,
			category,
			sets,
			reps,
			superSet,
			totalReps,
			progression,
			notes
		};

		try {
			const exerciseExists = await Exercise.findOne({ userId: req.user.id, name });

			if (exerciseExists) {
				return res.status(400).json({ errors: [{ msg: 'Exercise with that name already exists' }] });
			}

			const newExercise = new Exercise(exerciseFields);

			await newExercise.save();
			return res.json(newExercise);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
