import {
	SAVE_EXERCISE
} from '../actions/types';

const initialState = {
	categories: [
		{
			name: 'Legs',
			id: 0,
		},
		{
			name: 'Back',
			id: 1,
		},
		{
			name: 'Shoulders',
			id: 2,
		},
	],
}

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SAVE_EXERCISE:
			return state;
		default:
			return state;
	}
}
