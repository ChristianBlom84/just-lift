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
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
