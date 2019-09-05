import React from 'react'
import logo from '../images/icon512.svg';

export default function Header() {
	return (
		<header>
			<h1>Just Lift</h1><img id="logo" src={logo} alt="" />
		</header>
	)
}
