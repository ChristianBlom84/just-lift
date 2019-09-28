import React from 'react'
import WorkoutsList from '../components/workouts/WorkoutsList';

export default function Workouts() {
	return (
		<main className="general-main">
			<h2 className="center-text">Choose today&apos;s workout</h2>
			<WorkoutsList />
		</main>
	)
}
