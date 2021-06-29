import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Spinner from '../components/layout/Spinner';
import WorkoutAddExerciseDialog from '../components/workouts/WorkoutAddExerciseDialog';

import { createWorkout } from '../actions/workouts';
import { setAlert } from '../actions/alert';

function CreateWorkout({ createWorkout, categories, propExercises, history }) {
  const [formData, setFormData] = useState({
    name: '',
    exercises: [],
    notes: ''
  });

  const [open, setOpen] = useState(false);

  const { name, exercises, notes } = formData;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = exercise => {
    setOpen(false);
    if (exercise) {
      setFormData({
        ...formData,
        exercises: [...exercises, exercise]
      });
    }
  };

  const deleteExercise = exerciseToDelete => {
    const newExercises = exercises.filter(
      exercise => exerciseToDelete !== exercise.name
    );
    setFormData({ ...formData, exercises: newExercises });
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await createWorkout(formData);
      history.push('/workouts');
    } catch (err) {
      setAlert(err, 'danger');
    }
  };

  return createWorkout && propExercises && categories ? (
    <main className="flex column flex-grow">
      <h2 className="center-text m-4">Create New Workout:</h2>
      <form className="base-form" onSubmit={e => onSubmit(e)}>
        <TextField
          id="name"
          name="name"
          label="Workout Name"
          className="mx-4"
          value={name}
          onChange={e => onChange(e)}
          type="text"
          variant="outlined"
          required
        />
        <h3 className="center-text mt-4 mb-2">Exercises:</h3>
        <ul className="categories active-exercise-list">
          {exercises.map(exercise => (
            <li key={exercise.name} className="active-exercise">
              {exercise.name}
              <button
                type="button"
                onClick={() => deleteExercise(exercise.name)}
                className="btn btn-xs btn-secondary btn-delete"
              >
                X
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleClickOpen}
              className="btn btn-secondary btn-link"
              type="button"
            >
              ADD EXERCISE
            </button>
          </li>
        </ul>
        <div className="m-4 notes">
          <TextField
            id="notes"
            name="notes"
            value={notes}
            onChange={e => onChange(e)}
            label="Notes"
            multiline
            rows="3 "
            variant="outlined"
          />
        </div>
        <div className="flex column flex-grow justify-end m-4">
          <button type="submit" className="btn btn-primary btn-l self-center">
            SAVE WORKOUT
          </button>
        </div>
        <WorkoutAddExerciseDialog
          exercises={propExercises}
          categories={categories}
          open={open}
          onClose={handleClose}
        />
      </form>
    </main>
  ) : (
    <Spinner />
  );
}

CreateWorkout.propTypes = {
  createWorkout: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  propExercises: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.exercises.categories,
  propExercises: state.exercises.exercises
});

export default connect(mapStateToProps, { createWorkout })(CreateWorkout);
