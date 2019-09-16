/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { setAlert } from './alert';
import { SAVE_EXERCISE } from './types';

// Save Exercise
export const saveExercise = (formData) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	console.log("Inside saveExercise action");
	try {
		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/exercises`, formData, config);

		console.log(res);

		dispatch({
			type: SAVE_EXERCISE,
			payload: res.data
		});

		if (res.data.name) {
			dispatch(setAlert(`${res.data.name} successfully saved!`, 'success'));
		}
	} catch (err) {
		const { errors } = err.response.data;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}
