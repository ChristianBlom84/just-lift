import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen, faDumbbell, faWeightHanging, faChartPie } from '@fortawesome/free-solid-svg-icons';

function TabBar({ isAuthenticated }) {
	return isAuthenticated ? (
		<nav className="tab-bar">
			<Link to='/dashboard'><FontAwesomeIcon icon={faDoorOpen} size="2x" />Home</Link>
			<Link to='/workouts'><FontAwesomeIcon icon={faDumbbell} size="2x" />Workouts</Link>
			<Link to='/exercises'><FontAwesomeIcon icon={faWeightHanging} size="2x" />Exercises</Link>
			<Link to='/history'><FontAwesomeIcon icon={faChartPie} size="2x" />History</Link>
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
