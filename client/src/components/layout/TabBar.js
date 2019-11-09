import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faDumbbell, faWeightHanging, faChartPie } from '@fortawesome/free-solid-svg-icons';

function TabBar({ isAuthenticated }) {
	return isAuthenticated ? (
		<nav className="tab-bar">
			<Link to='/dashboard'><FontAwesomeIcon icon={faDoorOpen} />Home</Link>
			<Link to='/workouts'><FontAwesomeIcon icon={faDumbbell} />Workouts</Link>
			<Link to='/exercises'><FontAwesomeIcon icon={faWeightHanging} />Exercises</Link>
			<Link to='/history'><FontAwesomeIcon icon={faChartPie} />History</Link>
		</nav>
	) : null
}

TabBar.propTypes = {
	isAuthenticated: PropTypes.bool,
}

TabBar.defaultProps = {
	isAuthenticated: null
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, null)(TabBar);
