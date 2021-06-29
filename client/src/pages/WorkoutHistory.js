import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WorkoutHistoryList from '../components/workouts/WorkoutHistoryList';
import Spinner from '../components/layout/Spinner';

function WorkoutHistory({ workoutHistory, workouts, loading, match }) {
  return workouts !== null && workoutHistory !== null && !loading ? (
    <main className="general-main">
      <WorkoutHistoryList
        workouts={workouts}
        workoutHistory={workoutHistory}
        match={match}
      />
    </main>
  ) : (
    <Spinner />
  );
}

WorkoutHistory.propTypes = {
  workouts: PropTypes.array.isRequired,
  workoutHistory: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    workouts: state.workouts.workouts,
    workoutHistory: state.workouts.workoutHistory,
    loading: state.workouts.loading
  };
};

export default connect(mapStateToProps, null)(WorkoutHistory);
