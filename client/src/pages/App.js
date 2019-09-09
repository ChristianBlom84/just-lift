import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from '../store';

// Components
import Header from '../components/Header';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Workouts from './Workouts';
import Exercises from './Exercises';
import History from './History';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Header />
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/dashboard' component={Dashboard} />
						<Route exact path='/workouts' component={Workouts} />
						<Route exact path='/exercises' component={Exercises} />
						<Route exact path='/history' component={History} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
