import React from 'react'
import PropTypes from 'prop-types'

function Exercise({ location: { exercise } }) {

	return (
		<div>
			Exercise name: {exercise.name}
		</div>
	)
}

Exercise.propTypes = {
	location: PropTypes.object.isRequired,
}

export default Exercise;
