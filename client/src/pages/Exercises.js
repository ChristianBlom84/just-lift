import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Categories from '../components/exercises/Categories';

export default function Exercises({ match }) {
	return (
		<main className="general-main">
			<h2 className="center-text">Exercises</h2>
			<Categories />
			<div className="flex justify-between">
				<Link to={`${match.url}/create`}>
					<button type="button" className="btn btn-primary btn-sm">NEW EXERCISE</button>
				</Link>
				<Link to='/dashboard'>
					<button type="button" className="btn btn-secondary btn-sm">BACK</button>
				</Link>
			</div>
		</main>
	)
}

Exercises.propTypes = {
	match: PropTypes.object.isRequired,
}
