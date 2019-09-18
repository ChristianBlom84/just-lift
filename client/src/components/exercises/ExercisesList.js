import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

function ExercisesList({ exercises, categoryName, loading, match }) {

	const categoryExercises = exercises.filter((exercise) => exercise.category === categoryName);

	return loading ? (
		<Spinner />
	) : (
			<div className="exercises-list">
				<ul className="categories">
					{categoryExercises.map((exercise) => (
						<Link
							key={`Link ${exercise.name}`}
							to={{
								pathname: `${match.url}/${exercise.linkName}`,
								exercise
							}}>
							<li className="exercise" key={exercise.id}>{exercise.name}</li>
						</Link>
					))}
				</ul>
			</div>
		)
}

ExercisesList.propTypes = {
	exercises: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	categoryName: PropTypes.string.isRequired,
	match: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	exercises: state.exercises.exercises,
	loading: state.exercises.loading,
})

export default connect(mapStateToProps, null)(ExercisesList)
