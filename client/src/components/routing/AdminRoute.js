import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const AdminRoute = ({ component: Component, auth: { loading, user }, ...rest }) => {
	useEffect(() => {
		loadUser();
	})

	return (
		<Route {...rest}
			render={props =>
				!loading && !user.isAdmin ?
					(<Redirect to='/login' />) :
					(<Component {...props} />)
			}
		/>
	)
}

AdminRoute.propTypes = {
	auth: PropTypes.object.isRequired,
	component: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.func
	]).isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { loadUser })(AdminRoute)
