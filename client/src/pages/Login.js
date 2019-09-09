import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';

export default function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log("Logged in!", e.currentTarget);
		return <Redirect to='/dashboard' />;
	}

	return (
		<main className="general-main justify-between">
			<h2 className="center-text">Please sign in below</h2>
			<form className="login-register-form" onSubmit={(e) => onSubmit(e)}>
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
				<button type="submit" className="btn btn-primary mt-4 btn-medium">LOGIN</button>
			</form>
			<footer className="register-button">
				<p>Don&apos;t have an account?</p>
				<Link to="/register">
					<button type="button" className="btn btn-secondary btn-medium">REGISTER</button>
				</Link>
			</footer>
		</main>
	)
}
