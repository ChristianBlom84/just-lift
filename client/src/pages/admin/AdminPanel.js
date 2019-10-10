import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getAdminData } from '../../actions/auth';
import Spinner from '../../components/layout/Spinner';

function AdminPanel({ getAdminData, users }) {
	useEffect(() => {
		if (!users) {
			getAdminData();
		}
	})

	return users ? (
		<main>
			Welcome to the Admin panel!
			{users.map((user) => (
				<p>{user.name}</p>
			))}
		</main>
	) : (
			<Spinner />
		)
}

AdminPanel.propTypes = {
	getAdminData: PropTypes.func.isRequired,
	users: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
	users: state.auth.admin
})

export default connect(mapStateToProps, { getAdminData })(AdminPanel)
