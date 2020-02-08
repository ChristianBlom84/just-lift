import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Landing({ isAuthenticated }) {
	return isAuthenticated ? (
		<Redirect to="/dashboard" />
	) : (
			<main className='landing general-main'>
				<h2 className="center-text mb-3">Welcome to Just Lift!</h2>
				<div className="text">
					<p>A simple and powerful training logger.</p>
					<p>Create your own exercises and use them to compose workouts.</p>
					<p>Easily view your progression and history for each exercise or workout.</p>
				</div>
				<div className="buttons-landing">
					<Link to="/login">
						<button className="btn btn-primary" type="button">LOGIN</button>
					</Link>
					<Link to="/register">
						<button className="btn btn-primary" type="button">REGISTER</button>
					</Link>
				</div>
			</main>
		)
}

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
}

Landing.defaultProps = {
	isAuthenticated: null
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
