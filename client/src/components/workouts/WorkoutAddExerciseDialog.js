/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

function WorkoutAddExerciseDialog({ open, onClose, exercises, categories }) {
	const [category, setCategory] = useState(null);

	const handleListItemClick = (exercise) => {
		onClose(exercise);
		setCategory(null);
	}

	const handleClose = () => {
		onClose();
		setCategory(null);
	}

	const categoriesWithExercises = categories
		.filter((category) => {
			const existingExercises = exercises.filter((exercise) => exercise.category === category.name);
			return existingExercises.length > 0;
		});

	return (
		<Dialog onClose={handleClose} aria-label="Add exercise dialog" open={open}>
			<DialogContent>
				<ul className="categories workout-dialog">
					{category ? (
						exercises.map((exercise) => {
							return exercise.category === category ? (
								<li className="exercise" key={exercise._id}>
									<button key={`${exercise._id}-btn`} type="button" onClick={() => handleListItemClick(exercise)} className="btn btn-xs btn-link">{exercise.name}</button>
								</li>
							) : null
						})
					) : (
							categoriesWithExercises.map((category) => (
								<li key={category._id}>
									<button key={`${category._id}-btn`} type="button" onClick={() => setCategory(category.name)} className="btn btn-xs btn-link">{category.name}</button>
								</li>
							))
						)}
				</ul>
			</DialogContent>
		</Dialog>
	)
}

WorkoutAddExerciseDialog.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	categories: PropTypes.array.isRequired,
	exercises: PropTypes.array.isRequired,
}

export default WorkoutAddExerciseDialog;
