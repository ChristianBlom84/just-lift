import {
	CREATE_EXERCISE,
	UPDATE_EXERCISE,
	GET_EXERCISES,
	CREATE_CATEGORY,
	GET_CATEGORIES
} from '../actions/types';

const initialState = {
	categories: [],
	exercises: [],
	loading: true
}

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case CREATE_EXERCISE:
		case UPDATE_EXERCISE:
			return {
				...state,
				loading: false,
				exercises: [...state.exercises, payload]
			};
		case GET_EXERCISES:
			return {
				...state,
				loading: false,
				exercises: payload
			}
		case CREATE_CATEGORY:
			return {
				...state,
				loading: false,
				categories: [...state.categories, payload]
			}
		case GET_CATEGORIES:
			return {
				...state,
				loading: false,
				categories: payload
			}
		default:
			return state;
	}
}
