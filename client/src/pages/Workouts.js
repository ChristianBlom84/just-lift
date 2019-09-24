import React from 'react'
import PropTypes from 'prop-types';
import WorkoutsList from '../components/workouts/WorkoutsList';

export default function Workouts({ match }) {
	return (
		<main className="general-main">
			<h2 className="center-text">Choose today&apos;s workout</h2>
			<WorkoutsList match={match} />
		</main>
	)
}

Workouts.propTypes = {
	match: PropTypes.object.isRequired,
}
