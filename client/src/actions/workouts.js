import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_WORKOUTS,
	CREATE_WORKOUT
} from './types';

// Get Workouts
export const getWorkouts = () => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {
		const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/workouts`, config);

		dispatch({
			type: GET_WORKOUTS,
			payload: res.data
		})
	} catch (err) {
		setAlert(err, 'danger');
	}
}
