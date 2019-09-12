import React from 'react'
import { Link } from 'react-router-dom';

export default function Dashboard() {
	return (
		<main className="general-main justify-between dashboard">
			<div>
				<p>Choose a workout for today or create a new one.</p>
				<Link to='/workouts'>
					<button type="button" className="btn btn-primary btn-l">WORKOUTS</button>
				</Link>
			</div>
			<div>
				<p>View your current exercises or create new ones.</p>
				<Link to='/exercises'>
					<button type="button" className="btn btn-primary btn-l">EXERCISES</button>
				</Link>
			</div>
			<div className="mb-2">
				<p>View your workout and exercise history.</p>
				<Link to='/history'>
					<button type="button" className="btn btn-secondary btn-l">TRAINING HISTORY</button>
				</Link>
			</div>
		</main>
	)
}
