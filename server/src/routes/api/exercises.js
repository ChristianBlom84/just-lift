const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Exercise = require('../../models/Exercise');
const Category = require('../../models/Category');

const router = express.Router();

// Exercise routes

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

		const linkName = name.toLowerCase().replace(/\s/g, '-');

		const exerciseFields = {
			userId: req.user.id,
			name,
			linkName,
			category,
			categoryLinkName: '',
			categoryId: '',
			sets,
			reps,
			superSet,
			totalReps,
			progression,
			notes
		};

		try {
			const categoryModel = await Category.findOne({ name: category, userId: req.user.id });

			exerciseFields.categoryLinkName = categoryModel.linkName;
			exerciseFields.categoryId = categoryModel.id;

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

// @route   PUT api/exercises
// @desc    Edit an exercise
// @access  Private
router.put('/', auth, [
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

		const linkName = name.toLowerCase().replace(/\s/g, '-');

		const exerciseFields = {
			userId: req.user.id,
			name,
			linkName,
			category,
			categoryLinkName: '',
			categoryId: '',
			sets,
			reps,
			superSet,
			totalReps,
			progression,
			notes
		};

		try {
			const categoryModel = await Category.findOne({ name: category, userId: req.user.id });

			exerciseFields.categoryLinkName = categoryModel.linkName;
			exerciseFields.categoryId = categoryModel.id;

			const existingExercise = await Exercise.findOneAndUpdate({ userId: req.user.id, name }, exerciseFields, { new: true });

			await existingExercise.save();
			return res.json(existingExercise);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// Category routes

// @route   GET api/exercises/categories
// @desc    Get users exercises
// @access  Private
router.get('/categories', auth, async (req, res) => {
	try {
		const categories = await Category.find({ userId: req.user.id });
		console.log(req.user.id);
		return res.json(categories);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server error, could not retrieve categories');
	}
});

// @route   POST api/exercises/categories
// @desc    Create a new category
// @access  Private
router.post('/categories', auth, [
	check('name', 'You must specify a name')
		.not().isEmpty().bail().trim().escape(),
],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name } = req.body;

		const linkName = name.toLowerCase().replace(/\s/g, '-');

		try {
			const categoryExists = await Category.findOne({ userId: req.user.id, name });

			if (categoryExists) {
				return res.status(400).json({ errors: [{ msg: 'Category with that name already exists' }] });
			}

			const newCategory = new Category({ name, linkName, userId: req.user.id });

			await newCategory.save();
			return res.json(newCategory);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);


module.exports = router;
