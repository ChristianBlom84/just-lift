import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';

function Register({ setAlert, register, isAuthenticated }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			try {
				await register({ name, email, password });
			} catch (err) {
				setAlert(err, 'danger');
			}
		}
	}

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />
	};

	return (
		<main className="general-main justify-between">
			<div className="text">
				<h2 className="center-text">New to Just Lift?</h2>
				<p>Just register below and you can start logging right away!</p>
			</div>
			<form className="login-register-form" onSubmit={(e) => onSubmit(e)}>
				<input
					className="mb-4"
					type="text"
					placeholder="Name"
					name="name"
					value={name}
					onChange={(e) => onChange(e)}
					required
				/>
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
					className="mb-4"
					type="password"
					placeholder="Password"
					name="password"
					minLength="6"
					value={password}
					onChange={(e) => onChange(e)}
					required
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					name="password2"
					minLength="6"
					value={password2}
					onChange={(e) => onChange(e)}
					required
				/>
				<button type="submit" className="btn btn-primary mt-4 btn-medium">REGISTER</button>
			</form>
			<footer className="register-button">
				<p>Already have an account?</p>
				<Link to="/login">
					<button type="button" className="btn btn-secondary btn-medium">LOGIN</button>
				</Link>
			</footer>
		</main>
	)
}

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
