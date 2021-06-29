import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

function WorkoutsList({ workouts, loading }) {
  return !loading && workouts ? (
    <div>
      <ul className="categories">
        {workouts.map(workout => (
          <Link
            key={`Link ${workout.name}`}
            to={{
              pathname: `/workouts/${workout.linkName}`,
              workout
            }}
          >
            <li className="exercise" key={workout.id}>
              {workout.name}
            </li>
          </Link>
        ))}
        <Link to="/workouts/create">
          <li>
            <button className="btn btn-secondary btn-link" type="button">
              NEW WORKOUT
            </button>
          </li>
        </Link>
      </ul>
    </div>
  ) : (
    <Spinner />
  );
}

WorkoutsList.propTypes = {
  workouts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  workouts: state.workouts.workouts,
  loading: state.workouts.loading
});

export default connect(mapStateToProps, null)(WorkoutsList);
