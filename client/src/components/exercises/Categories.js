import React from 'react'
import PropTypes from 'prop-types'

function Categories(props) {
	return (
		<div className="exercise-categories">
			<h3 className="mb-2">Categories:</h3>
			<ul className="categories">
				<li>Legs</li>
				<li>Back</li>
				<li>Chest</li>
				<li>Shoulders</li>
				<li>Stomach</li>
			</ul>
			<div className="flex justify-between mt-4">
				<button type="button" className="btn btn-secondary btn-xs">PREV</button>
				<button type="button" className="btn btn-secondary btn-xs">NEXT</button>
			</div>
		</div>
	)
}

Categories.propTypes = {

}

export default Categories
