import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/auth';

// Components
import Header from '../components/layout/Header';
import Alert from '../components/Alert';
import Login from './Login';
import Register from './Register';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Workouts from './Workouts';
import Workout from './Workout';
import TodaysWorkout from './TodaysWorkout';
import CreateWorkout from './CreateWorkout';
import Exercise from './Exercise';
import Exercises from './Exercises';
import Category from './Category';
import CreateExercise from './CreateExercise';
import EditExercise from './EditExercise';
import History from './History';
import WorkoutHistory from './WorkoutHistory';
import SingleWorkoutHistory from './SingleWorkoutHistory';
import SingleWorkoutHistoryEntry from './SingleWorkoutHistoryEntry';
import ExerciseHistory from './ExerciseHistory';
import PrivateRoute from '../components/routing/PrivateRoute';
import TabBar from '../components/layout/TabBar';

import AdminRoute from '../components/routing/AdminRoute';
import AdminPanel from './admin/AdminPanel';

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
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/workouts" component={Workouts} />
            <PrivateRoute
              exact
              path="/workouts/create"
              component={CreateWorkout}
            />
            <PrivateRoute
              exact
              path="/workouts/todays-workout"
              component={TodaysWorkout}
            />
            <PrivateRoute
              exact
              path="/workouts/:workoutName"
              component={Workout}
            />
            <PrivateRoute exact path="/exercises" component={Exercises} />
            <PrivateRoute
              exact
              path="/exercises/create"
              component={CreateExercise}
            />
            <PrivateRoute
              exact
              path="/exercises/edit"
              component={EditExercise}
            />
            <PrivateRoute
              exact
              path="/exercises/:category"
              component={Category}
            />
            <PrivateRoute
              exact
              path="/exercises/:category/:exerciseName"
              component={Exercise}
            />
            <PrivateRoute exact path="/history" component={History} />
            <PrivateRoute
              exact
              path="/history/workouts"
              component={WorkoutHistory}
            />
            <PrivateRoute
              exact
              path="/history/workouts/:workoutName"
              component={SingleWorkoutHistory}
            />
            <PrivateRoute
              exact
              path="/history/workouts/:workoutName/:workoutEntryId"
              component={SingleWorkoutHistoryEntry}
            />
            <PrivateRoute
              exact
              path="/history/exercises"
              component={ExerciseHistory}
            />
            <AdminRoute exact path="/admin" component={AdminPanel} />
          </Switch>
          <TabBar />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
