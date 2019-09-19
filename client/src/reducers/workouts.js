import {
	GET_WORKOUTS,
	CREATE_WORKOUT
} from '../actions/types';

const initialState = {
	workouts: [],
	loading: true
}

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_WORKOUTS:
			return {
				...state,
				loading: false,
				workouts: payload
			};
		case CREATE_WORKOUT:
			return {
				...state,
				workouts: [...state.workouts, payload]
			};
		default:
			return state;
	}
}
