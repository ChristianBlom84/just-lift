import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

function WorkoutHistoryList({ workoutHistory, workouts, match }) {
	const yearHeading = workoutHistory !== null && workoutHistory.finishedWorkouts.length > 0 ? new Date(workoutHistory.finishedWorkouts[0].date).getFullYear() : null;
	const monthHeading = workoutHistory !== null && workoutHistory.finishedWorkouts.length > 0 ? new Date(workoutHistory.finishedWorkouts[0].date).getMonth() : null;

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	return workouts !== null && workoutHistory !== null && workoutHistory && match ? (
		<Fragment>
			{yearHeading ? (
				<h2 className="mb-3 center-text">{yearHeading}</h2>
			) : (null)}
			{monthHeading ? (
				<h3 className="my-2">{`${months[monthHeading]}:`}</h3>
			) : (null)}
			{workoutHistory.finishedWorkouts.length > 0 ? (
				workoutHistory.finishedWorkouts.map((historyEntry, index) => index <= 4 ? (
					<Fragment key={historyEntry._id}>
						{yearHeading !== new Date(historyEntry.date).getFullYear() && new Date(historyEntry.date).getFullYear() !== new Date(workoutHistory.finishedWorkouts[index - 1].date).getFullYear() ? (<h2 className="my-3 center-text">{new Date(historyEntry.date).getFullYear()}</h2>) : (null)}
						{monthHeading !== new Date(historyEntry.date).getMonth() || yearHeading !== new Date(historyEntry.date).getFullYear() ? (<h3 className="my-2">{`${months[new Date(historyEntry.date).getMonth()]}:`}</h3>) : (null)}
						<Link className="no-decoration" to={`${match.url}/${historyEntry.linkName}/${historyEntry._id}`}>
							<div className="flex column workout-history-entry mb-4">
								<div className="flex align-center workout-entry-heading">
									<span className="workout-date">{new Date(historyEntry.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
									<h3 className="small-heading center-text flex-grow">{historyEntry.name}</h3>
								</div>
								<div className="flex justify-center workout-entry-data">
									<table className="flex-grow">
										<thead>
											<tr>
												<td>Total sets:</td>
												<td>Total reps:</td>
												<td>Total weight:</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="center-text">{historyEntry.sets}</td>
												<td className="center-text">{historyEntry.reps}</td>
												<td className="center-text">{Number(historyEntry.totalLifted).toLocaleString()} kgs</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</Link>
					</Fragment>
				) : (null))
			) : (
					<h3>No workout history found! <Link to='/workouts'>Go lift!</Link></h3>
				)}
		</Fragment>
	) : (
			<Spinner />
		)
}
WorkoutHistoryList.propTypes = {
	workouts: PropTypes.array.isRequired,
	workoutHistory: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
}

export default WorkoutHistoryList
