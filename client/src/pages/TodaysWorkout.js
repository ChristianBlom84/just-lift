import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../components/layout/Spinner';
import WorkoutActiveExercise from '../components/workouts/WorkoutActiveExercise';

function TodaysWorkout({ loading, workout, workoutProgress }) {
	return !loading && workout ? (
		<main className="flex column flex-grow">
			<h2 className="center-text mt-4">{workout.name}</h2>
			{workout.exercises.map((exercise) => (
				<WorkoutActiveExercise key={exercise.name} exercise={exercise} />
			))}
		</main>
	) : (
			<Spinner />
		)
}

TodaysWorkout.propTypes = {
	loading: PropTypes.bool.isRequired,
	workout: PropTypes.object.isRequired,
	workoutProgress: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	loading: state.workouts.loading,
	workout: state.workouts.currentWorkout,
	workoutProgress: state.workouts.currentWorkoutProgress,
})

export default connect(mapStateToProps, {})(TodaysWorkout);
