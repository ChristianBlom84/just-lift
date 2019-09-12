import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { login } from '../actions/auth';

function Login({ setAlert, login, isAuthenticated }) {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await login({ email, password });
		} catch (err) {
			setAlert(err, 'danger');
		}
	}

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<main className="general-main justify-between">
			<h2 className="center-text">Please sign in below</h2>
			<form className="base-form login-register-form" onSubmit={(e) => onSubmit(e)}>
				<input
					className="mb-4"
					type="email"
					placeholder="Email address"
					name="email"
					value={email}
					onChange={(e) => onChange(e)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					value={password}
					onChange={(e) => onChange(e)}
					required
				/>
				<button type="submit" className="btn btn-primary mt-4 btn-m">LOGIN</button>
			</form>
			<footer className="register-button">
				<p>Don&apos;t have an account?</p>
				<Link to="/register">
					<button type="button" className="btn btn-secondary btn-m">REGISTER</button>
				</Link>
			</footer>
		</main>
	)
}

Login.propTypes = {
	setAlert: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

Login.defaultProps = {
	isAuthenticated: null
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, login })(Login);
