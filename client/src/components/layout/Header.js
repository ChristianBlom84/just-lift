import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../images/icon512.svg';

function Header({ isAuthenticated }) {
	return (
		<header className="banner">
			<Link to={isAuthenticated === true ? '/dashboard' : '/'}>
				<h1>Just Lift</h1><img className="logo" src={logo} alt="" />
			</Link>
		</header>
	)
}

Header.propTypes = {
	isAuthenticated: PropTypes.bool,
}

Header.defaultProps = {
	isAuthenticated: null
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Header);
