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
	check('name', 'You must specify a name')
		.not().isEmpty().bail().trim().escape(),
	check('exercises', 'You must include at least one exercise')
		.not().isEmpty(),
	check('notes')
		.optional().trim().escape()
],
	async (req, res) => {
	}
)

module.exports = router;
