import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import ExerciseChart from '../components/history/ExerciseChart';
import Spinner from '../components/layout/Spinner';

const ExerciseHistory = ({ exercises }) => {
	return exercises.length > 1 ? (
		<main>
			<ExerciseChart exercises={exercises} />
		</main>
	) : (
			<Spinner />
		)
}

ExerciseHistory.propTypes = {
	exercises: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
	exercises: state.exercises.exercises
})


export default connect(mapStateToProps, null)(ExerciseHistory);
