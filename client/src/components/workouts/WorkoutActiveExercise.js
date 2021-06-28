/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { startWorkout, updateWorkoutProgress } from '../../actions/workouts';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles(() => ({
  textField: {
    maxWidth: '3rem'
  },
  weightInput: {
    maxWidth: '5.5rem'
  },
  positionEnd: {
    marginLeft: '0'
  }
}));

function WorkoutActiveExercise({ exercise, updateWorkoutProgress }) {
  const classes = useStyles();

  const [sets, setSets] = useState(() => {
    let initialState = [];

    if (exercise.superSet === true) {
      for (let i = 0; i < exercise.sets; i += 1) {
        if (i === 0) initialState.push({ set: i + 1, done: false, reps: 0 });
        else
          initialState = [
            ...initialState,
            { set: i + 1, done: false, reps: 0 }
          ];
      }
    } else {
      for (let i = 0; i < exercise.sets; i += 1) {
        if (i === 0)
          initialState.push({ set: i + 1, done: false, reps: exercise.reps });
        else
          initialState = [
            ...initialState,
            { set: i + 1, done: false, reps: exercise.reps }
          ];
      }
    }
    return initialState;
  });

  const [weight, setWeight] = useState(() => {
    if (exercise.nextStartWeight) {
      return { [exercise.name]: exercise.nextStartWeight };
    }
    return { [exercise.name]: 20 };
  });

  useEffect(() => {
    updateWorkoutProgress({
      [exercise.name]: {
        id: exercise._id,
        sets: [...sets],
        superSet: exercise.superSet,
        weight: Number(weight[exercise.name])
      }
    });
  }, [sets, updateWorkoutProgress, exercise, weight]);

  const onChange = (e, index) => {
    if (e.target.name === `${exercise.name}-weight`) {
      setWeight({ [exercise.name]: e.target.value });
    } else {
      setSets(prevSets => {
        return prevSets.map((prevSet, idx) => {
          if (index !== idx) {
            return prevSet;
          }
          if (e.target.value === 'done') {
            return { ...prevSet, done: e.target.checked };
          }
          return { ...prevSet, reps: Number(e.target.value) };
        });
      });
    }
  };

  return exercise && sets ? (
    <div className="flex column mt-4">
      <div className="flex align-center justify-center textfield-container mb-2">
        <h3 className="center-text mr-2">{exercise.name}</h3>
        <TextField
          id={`${exercise.name}-weight`}
          className={classes.weightInput}
          name={`${exercise.name}-weight`}
          label="Weight: "
          value={weight[exercise.name]}
          onChange={e => onChange(e)}
          type="number"
          InputProps={{
            min: '0',
            endAdornment: (
              <InputAdornment
                classes={{ positionEnd: classes.positionEnd }}
                position="end"
              >
                Kg
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </div>
      {exercise.superSet ? (
        <p className="center-text mt-0">Total rep goal: {exercise.totalReps}</p>
      ) : null}
      <ul className="categories active-exercise-list">
        {Array(exercise.sets)
          .fill(null)
          .map((value, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`${exercise.name}-${index}`} className="active-exercise">
              <div>
                <span className="bold">Set: </span>
                {index + 1}
              </div>
              <div className="textfield-container">
                <TextField
                  id={`reps-${index}`}
                  className={classes.textField}
                  name={`reps-${index}`}
                  label="Reps"
                  value={sets[index].reps}
                  onChange={e => onChange(e, index)}
                  type="number"
                  inputProps={{
                    min: '0',
                    step: '1'
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
              </div>
              <FormControlLabel
                control={
                  <Switch
                    name={`done-${index}`}
                    color="primary"
                    checked={sets[index].done}
                    value="done"
                    onChange={e => onChange(e, index)}
                  />
                }
                label="Done?"
                labelPlacement="end"
              />
            </li>
          ))}
      </ul>
    </div>
  ) : (
    <Spinner />
  );
}

WorkoutActiveExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  updateWorkoutProgress: PropTypes.func.isRequired
};

export default connect(null, { startWorkout, updateWorkoutProgress })(
  WorkoutActiveExercise
);
