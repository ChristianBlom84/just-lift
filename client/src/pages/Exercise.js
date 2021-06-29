import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../components/layout/Spinner';

function Exercise({ exercise, loading }) {
  return !loading && exercise ? (
    <main className="general-main">
      <h2 className="center-text">{exercise.name}</h2>
      {exercise.superSet ? (
        <div className="flex justify-between">
          <div>
            <span className="bold enlarge">Sets: </span>
            {exercise.sets}
          </div>
          <div>
            <span className="bold enlarge">Total reps: </span>
            {exercise.totalReps}
          </div>
        </div>
      ) : (
        <div className="flex">
          <div>
            <span className="bold enlarge">Sets: </span>
            {exercise.sets}
          </div>
          <div className="ml-4">
            <span className="bold enlarge">Reps: </span>
            {exercise.reps}
          </div>
        </div>
      )}
      <div className="mt-4 flex-grow">
        <span className="bold enlarge">Progression weight: </span>
        {exercise.progression} kgs
      </div>
      {exercise.notes ? (
        <div className="mt-4 flex-grow">
          <span className="bold enlarge">Notes: </span>
          <p>{exercise.notes}</p>
        </div>
      ) : null}
      <div className="flex justify-between">
        <Link
          to={{
            pathname: '/exercises/edit',
            exerciseToEdit: exercise
          }}
        >
          <button type="button" className="btn btn-primary btn-sm">
            EDIT EXERCISE
          </button>
        </Link>
        <Link to={`/exercises/${exercise.categoryLinkName}`}>
          <button type="button" className="btn btn-secondary btn-sm">
            BACK
          </button>
        </Link>
      </div>
    </main>
  ) : (
    <Spinner />
  );
}

Exercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { match } = ownProps;

  const [exercise] = state.exercises.exercises.filter(
    exercise => exercise.linkName === match.params.exerciseName
  );

  return {
    loading: state.exercises.loading,
    exercise
  };
};

export default connect(mapStateToProps, null)(Exercise);
