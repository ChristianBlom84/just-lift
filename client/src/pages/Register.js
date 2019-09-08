import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});

	const { name, email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log("Registered!");
	}

	return (
		<main className="general-main login-register">
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
					type="password"
					placeholder="Password"
					name="password"
					value={password}
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
