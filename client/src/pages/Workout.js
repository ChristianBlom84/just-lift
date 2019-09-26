import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startWorkout } from '../actions/workouts';
import Spinner from '../components/layout/Spinner';

function Workout({ workout, loading, startWorkout, history }) {

	const handleStartWorkout = () => {
		startWorkout(workout);
		history.push('/workouts/todays-workout');
	}

	return workout ? (
		<main className="flex column flex-grow">
			<h2 className="center-text mt-4">{workout.name}</h2>
			<h3 className="center-text">Exercises</h3>
			<ul className="categories workout-exercises mt-4">
				{!loading && workout ? (
					workout.exercises.map((exercise) => (
						<Link key={exercise.name} to={`/exercises/${exercise.categoryLinkName}/${exercise.linkName}`}>
							<li className="center-text workout-exercise">{exercise.name}</li>
						</Link>
					))
				) : (
						<Spinner />
					)}
			</ul>
			{workout.notes ? (
				<div className="notes m-4 px-4 flex-grow">
					<h3 className="center-text">Notes</h3>
					<p>{workout.notes}</p>
				</div>
			) : (null)}
			<button onClick={() => handleStartWorkout()} className="btn btn-primary btn-l m-4 self-center" type="button">START WORKOUT</button>
		</main>
	) : (
			<Spinner />
		)
}

Workout.propTypes = {
	workout: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	startWorkout: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
	const { match } = ownProps;

	const [workout] = state.workouts.workouts.filter((workout) => workout.linkName === match.params.workoutName);

	return {
		workout,
		loading: state.workouts.loading
	};
};

export default connect(mapStateToProps, { startWorkout })(Workout);
