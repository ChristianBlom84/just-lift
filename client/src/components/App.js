import React from 'react';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<h1>Welcome to Just Lift!</h1>
			</div>
		</Provider>
	);
}

export default App;
