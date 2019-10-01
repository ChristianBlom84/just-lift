import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../components/layout/Spinner';

function SingleWorkoutHistoryEntry({ workoutEntry, workout, exerciseEntries }) {
	return workout && workoutEntry && exerciseEntries ? (
		<main className="flex column single-workout-history-entry">
			<h2 className="center-text mb-4">{workoutEntry.name}</h2>
			{exerciseEntries.map((entry, index) => (
				<div key={entry._id} className="flex column align-center mb-6 box-shadow-bottom pt-2">
					<h3>{entry.name}</h3>
					<p><span className="bold enlarge">Set weight: </span>{entry.weight} kgs</p>
					<ul className="active-exercise-list">
						{entry.sets.map((set) => (
							<Fragment>
								<li className="flex justify-evenly">
									<span><span className="bold enlarge">Set: </span>{set.set}</span>
									<span><span className="bold enlarge">Reps: </span>{set.reps}</span>
									<span><span className="bold enlarge">Done: </span>{set.done ? "\u2713" : "\u2717"}</span>
								</li>
							</Fragment>
						))}
						<p className="center-text mb-0"><span className="bold enlarge">Reps done: </span>{entry.totalReps}
							{entry.superSet ? (
								<span className="center-text ml-4 mt-0"><span className="bold enlarge">Goal: </span>{workout.exercises[index].totalReps}</span>
							) : (
									<span className="center-text ml-4 mt-0"><span className="bold enlarge">Goal per set: </span>{workout.exercises[index].reps}</span>
								)}
						</p>
						<p className="center-text"><span className="bold enlarge">Total weight: </span>{Number(entry.totalLifted).toLocaleString()} kgs</p>
					</ul>

				</div>
			))}
		</main>
	) : (
			<Spinner />
		)
}

SingleWorkoutHistoryEntry.propTypes = {
	workoutEntry: PropTypes.object.isRequired,
	workout: PropTypes.object.isRequired,
	exerciseEntries: PropTypes.array.isRequired,
}

const mapStateToProps = (state, ownProps) => {
	const { params: { workoutEntryId } } = ownProps.match;
	const [workoutEntry] = state.workouts.workoutHistory.finishedWorkouts.filter((workout) => workout._id === workoutEntryId);

	const [workout] = state.workouts.workouts.filter((workout) => workout._id === workoutEntry.workoutId);

	const exerciseEntries = workout.exercises.map((exercise) => {
		const [exerciseHistoryEntry] = exercise.history.filter((historyEntry) => Date.parse(historyEntry.date) < Date.parse(workoutEntry.date) + 10000 && Date.parse(historyEntry.date) > Date.parse(workoutEntry.date) - 10000);
		return exerciseHistoryEntry;
	})

	return {
		workoutEntry,
		workout,
		exerciseEntries
	}
}

export default connect(mapStateToProps, null)(SingleWorkoutHistoryEntry)
