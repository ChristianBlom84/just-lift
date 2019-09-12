import React, { useState } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Material UI
import FormControl from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 200
	},
	select: {

	},
}));

function CreateExercise({ categories }) {
	const classes = useStyles();

	const [formData, setFormData] = useState({
		name: '',
		category: '',
		sets: 0,
		reps: 0,
		superSet: false,
		totalReps: null,
		progression: 2.5,
		notes: ''
	})

	const { name, category, sets, reps, superSet, totalReps, progression, notes } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	return (
		<main className="general-main">
			<h2 className="center-text">Create New Exercise:</h2>
			<form className={classes.root}>
				<input
					type="text"
					placeholder="Exercise name"
					name="name"
					value={name}
					onChange={(e) => onChange(e)}
					required
				/>
				<FormControl variant="filled" className={classes.formControl}>
					<InputLabel htmlFor="category">Category:</InputLabel>
					<NativeSelect
						className={classes.select}
						value={category}
						onChange={(e) => onChange(e)}
						inputProps={{
							name: 'category',
							id: 'category',
						}}
					>
						<option value="" />
						{categories.map((reduxCategory) => (
							<option key={reduxCategory.id} value={reduxCategory.id}>{reduxCategory.name}</option>
						))}
					</NativeSelect>
				</FormControl>
			</form>
		</main>
	)
}

CreateExercise.propTypes = {
	categories: PropTypes.array
}

CreateExercise.defaultProps = {
	categories: []
}

const mapStateToProps = state => ({
	categories: state.exercises.categories
})

export default connect(mapStateToProps, null)(CreateExercise);
