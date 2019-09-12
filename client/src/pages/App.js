import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from '../store';

// Components
import Header from '../components/Header';
import Alert from '../components/Alert';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Workouts from './Workouts';
import Exercises from './Exercises';
import CreateExercise from './CreateExercise';
import History from './History';
import PrivateRoute from '../components/routing/PrivateRoute';

function App() {
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
						<PrivateRoute exact path='/history' component={History} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
