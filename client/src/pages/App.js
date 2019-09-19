import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/auth';

// Components
import Header from '../components/Header';
import Alert from '../components/Alert';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Workouts from './Workouts';
import Exercise from './Exercise';
import Exercises from './Exercises';
import Category from './Category';
import CreateExercise from './CreateExercise';
import EditExercise from './EditExercise';
import History from './History';
import PrivateRoute from '../components/routing/PrivateRoute';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Header />
					<Alert />
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<PrivateRoute exact path='/dashboard' component={Dashboard} />
						<PrivateRoute exact path='/workouts' component={Workouts} />
						<PrivateRoute exact path='/exercises' component={Exercises} />
						<PrivateRoute exact path='/exercises/create' component={CreateExercise} />
						<PrivateRoute exact path='/exercises/edit' component={EditExercise} />
						<PrivateRoute exact path='/exercises/:category' component={Category} />
						<PrivateRoute exact path='/exercises/:category/:exerciseName' component={Exercise} />
						<PrivateRoute exact path='/history' component={History} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
