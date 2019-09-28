import {
	GET_WORKOUTS,
	CREATE_WORKOUT,
	UPDATE_WORKOUT_PROGRESS,
	START_WORKOUT,
	FINISH_WORKOUT,
} from '../actions/types';

const initialState = {
	workouts: [
		{
			name: "Create a new workout to get started!"
		}
	],
	currentWorkout: {},
	currentWorkoutProgress: [],
	loading: true,
	workoutActive: false,
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
				loading: false,
				workouts: [...state.workouts, payload]
			};
		case START_WORKOUT:
			return {
				...state,
				loading: false,
				workoutActive: true,
				currentWorkout: payload
			};
		case UPDATE_WORKOUT_PROGRESS:
			return {
				...state,
				loading: false,
				currentWorkoutProgress: { ...state.currentWorkoutProgress, ...payload }
			};
		case FINISH_WORKOUT:
			return {
				...state,
				loading: false,
				currentWorkout: null,
				currentWorkoutProgress: null,
			};
		default:
			return state;
	}
}
