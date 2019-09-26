import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Spinner from '../components/layout/Spinner';
import WorkoutActiveExercise from '../components/workouts/WorkoutActiveExercise';
import { finishWorkout } from '../actions/workouts';
import { setAlert } from '../actions/alert';

function TodaysWorkout({ loading, workout, workoutProgress, finishWorkout, history, setAlert }) {
	const handleFinishWorkout = () => {
		finishWorkout(workout, workoutProgress);
		setAlert('Workout finished!', 'success');
		history.push('/dashboard');
	}

	const [notes, setNotes] = useState('');

	const onChange = (e) => setNotes(e.target.value);

	return !loading && workout ? (
		<main className="flex column flex-grow">
			<h2 className="center-text mt-4">{workout.name}</h2>
			{workout.exercises.map((exercise) => (
				<WorkoutActiveExercise key={exercise.name} exercise={exercise} />
			))}
			<div className="m-4 notes">
				<TextField
					id="notes"
					name="notes"
					value={notes}
					onChange={(e) => onChange(e)}
					label="Notes"
					multiline
					rows="3 "
					variant="outlined"
				/>
			</div>
			<div className="flex justify-between flex-grow align-end m-4">
				<button type="button" onClick={() => handleFinishWorkout()} className="btn btn-primary btn-sm">FINISH WORKOUT</button>
				<button type="button" onClick={() => history.goBack()} className="btn btn-secondary btn-sm">BACK</button>
			</div>
		</main>
	) : (
			<Spinner />
		)
}

TodaysWorkout.propTypes = {
	loading: PropTypes.bool.isRequired,
	workout: PropTypes.object.isRequired,
	workoutProgress: PropTypes.object.isRequired,
	finishWorkout: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	loading: state.workouts.loading,
	workout: state.workouts.currentWorkout,
	workoutProgress: state.workouts.currentWorkoutProgress,
})

export default connect(mapStateToProps, { finishWorkout, setAlert })(TodaysWorkout);
