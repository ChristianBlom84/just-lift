import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import exercises from './exercises';

export default combineReducers({
	auth,
	alert,
	exercises
});
