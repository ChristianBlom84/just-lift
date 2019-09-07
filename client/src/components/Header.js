import React from 'react'
import logo from '../images/icon512.svg';

export default function Header() {
	return (
		<header className="banner">
			<h1>Just Lift</h1><img className="logo" src={logo} alt="" />
		</header>
	)
}
