/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { setAlert } from './alert';
import {
	CREATE_EXERCISE,
	UPDATE_EXERCISE,
	GET_EXERCISES,
	CREATE_CATEGORY,
	GET_CATEGORIES
} from './types';

// Exercises Actions

export const getExercises = () => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {
		const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/exercises`, config);

		dispatch({
			type: GET_EXERCISES,
			payload: res.data
		})
	} catch (err) {
		setAlert(err, 'danger');
	}
}

export const saveExercise = (formData) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {
		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/exercises`, formData, config);

		dispatch({
			type: CREATE_EXERCISE,
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

export const updateExercise = (formData) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {
		const res = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/exercises`, formData, config);

		dispatch({
			type: UPDATE_EXERCISE,
			payload: res.data
		});

		if (res.data.name) {
			dispatch(setAlert(`${res.data.name} successfully updated!`, 'success'));
		}
	} catch (err) {
		const { errors } = err.response.data;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}

// Categories Actions

export const getCategories = () => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {
		const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/exercises/categories`, config);

		dispatch({
			type: GET_CATEGORIES,
			payload: res.data
		})
	} catch (err) {
		setAlert(err, 'danger');
	}
}

// Save Category
export const saveCategory = (name) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	try {
		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/exercises/categories`, name, config);

		dispatch({
			type: CREATE_CATEGORY,
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
