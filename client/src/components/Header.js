import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/icon512.svg';

export default function Header() {
	return (
		<header className="banner">
			<Link to='/'>
				<h1>Just Lift</h1><img className="logo" src={logo} alt="" />
			</Link>
		</header>
	)
}
