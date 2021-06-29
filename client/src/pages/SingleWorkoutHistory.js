import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WorkoutHistoryList from '../components/workouts/WorkoutHistoryList';
import Spinner from '../components/layout/Spinner';

function SingleWorkoutHistory({
  workoutHistory,
  workouts,
  singleWorkoutHistory,
  loading,
  match
}) {
  console.log(singleWorkoutHistory);
  return workouts !== null &&
    workoutHistory !== null &&
    singleWorkoutHistory !== null &&
    !loading ? (
    <main className="general-main">
      <WorkoutHistoryList
        workouts={workouts}
        workoutHistory={singleWorkoutHistory}
        match={match}
      />
    </main>
  ) : (
    <Spinner />
  );
}

SingleWorkoutHistory.propTypes = {
  workouts: PropTypes.array.isRequired,
  workoutHistory: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  singleWorkoutHistory: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const singleWorkoutHistory = state.workouts.workoutHistory;
  singleWorkoutHistory.finishedWorkouts = state.workouts.workoutHistory.finishedWorkouts.filter(
    historyEntry => historyEntry.linkName === ownProps.match.params.workoutName
  );

  console.log(singleWorkoutHistory);
  return {
    workouts: state.workouts.workouts,
    workoutHistory: state.workouts.workoutHistory,
    loading: state.workouts.loading,
    singleWorkoutHistory
  };
};

export default connect(mapStateToProps, null)(SingleWorkoutHistory);
