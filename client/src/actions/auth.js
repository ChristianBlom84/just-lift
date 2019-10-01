/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { setAlert } from './alert';
import { getExercises, getCategories } from './exercises';
import { getWorkouts, getWorkoutHistory } from './workouts';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	AUTH_ERROR,
	USER_LOADED
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/auth`);

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});

		dispatch(getExercises());
		dispatch(getCategories());
		dispatch(getWorkouts());
		dispatch(getWorkoutHistory());
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
}

// Register User
export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		const { errors } = err.response.data;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
}

// Login User
export const login = ({ email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (err) {
		const { errors } = err.response.data;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: LOGIN_FAIL
		});
	}
}
