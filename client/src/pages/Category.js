import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ExercisesList from '../components/exercises/ExercisesList';
import Spinner from '../components/layout/Spinner';

function Category({ match, loading, categories }) {
	const [currentCategory] = categories.filter((category) => category.linkName === match.params.category);

	return (!loading && currentCategory.name !== undefined) ? (
		<main className="general-main">
			<h2 className="center-text">Exercises</h2>
			<div className="exercise-categories">
				<h3 className="mb-2">{currentCategory.name}:</h3>
				<ExercisesList categoryName={currentCategory.name} match={match} />
			</div>
			<div className="flex justify-between">
				<Link to={`${match.url}/create`}>
					<button type="button" className="btn btn-primary btn-sm">NEW EXERCISE</button>
				</Link>
				<Link to='/exercises'>
					<button type="button" className="btn btn-secondary btn-sm">BACK</button>
				</Link>
			</div>
		</main>
	) : (
			<Spinner />
		)
}

Category.propTypes = {
	match: PropTypes.object.isRequired,
	loading: PropTypes.bool.isRequired,
	categories: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
	loading: state.exercises.loading,
	categories: state.exercises.categories
})

export default connect(mapStateToProps, null)(Category);
