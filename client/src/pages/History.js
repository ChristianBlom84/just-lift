import React from 'react'
import { Link } from 'react-router-dom';

export default function History() {
	return (
		<main className="general-main dashboard justify-evenly">
			<div>
				<p>See an overview of your workout history.</p>
				<Link to='/history/workouts'>
					<button type="button" className="btn btn-primary btn-l">WORKOUT HISTORY</button>
				</Link>
			</div>
			<div>
				<p>Get a detailed history of individual exercises.</p>
				<Link to='/history/exercises'>
					<button type="button" className="btn btn-primary btn-l">EXERCISE HISTORY</button>
				</Link>
			</div>
		</main>
	)
}
