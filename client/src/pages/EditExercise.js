import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Material UI
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

import { setAlert } from '../actions/alert';
import { updateExercise } from '../actions/exercises';

function EditExercise({
  categories,
  setAlert,
  updateExercise,
  location: { exerciseToEdit },
  history
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sets: 3,
    reps: 5,
    superSet: false,
    totalReps: null,
    progression: 2.5,
    notes: ''
  });

  useEffect(() => {
    if (exerciseToEdit) {
      const {
        name,
        category,
        sets,
        reps,
        superSet,
        totalReps,
        progression,
        notes
      } = exerciseToEdit;

      setFormData({
        name,
        category,
        sets,
        reps,
        superSet,
        totalReps,
        progression,
        notes
      });
    }
  }, [exerciseToEdit]);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const {
    name,
    category,
    sets,
    reps,
    superSet,
    totalReps,
    progression,
    notes
  } = formData;

  const onChange = e => {
    if (e.target.name === 'superSet') {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await updateExercise(formData);

      setTimeout(() => {
        history.goBack();
      }, 2000);
    } catch (err) {
      setAlert(err, 'danger');
    }
  };

  return (
    <main className="general-main">
      <h2 className="center-text">Edit Exercise:</h2>
      <form className="base-form mt-2" onSubmit={e => onSubmit(e)}>
        <TextField
          id="name"
          name="name"
          label="Exercise Name"
          value={name}
          onChange={e => onChange(e)}
          type="text"
          variant="outlined"
          required
        />
        <div className="form-group-category mt-4">
          <FormControl required className="category-select" variant="outlined">
            <InputLabel ref={inputLabel} className="" htmlFor="category">
              Category:
            </InputLabel>
            <Select
              native
              className="category-select"
              value={category}
              labelWidth={labelWidth}
              onChange={e => onChange(e)}
              inputProps={{
                name: 'category',
                id: 'category'
              }}
            >
              <option value="" />
              {categories.map(reduxCategory => (
                <option key={reduxCategory.name} value={reduxCategory.name}>
                  {reduxCategory.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="mt-4 flex super-set">
          <FormControlLabel
            control={
              <Switch
                name="superSet"
                checked={superSet}
                color="primary"
                value="superSet"
                onChange={e => onChange(e)}
              />
            }
            label="Superset"
            labelPlacement="start"
          />
          <div className="reps-sets">
            <TextField
              id="reps"
              name="reps"
              label="Reps"
              value={reps}
              onChange={e => onChange(e)}
              type="number"
              inputProps={{
                min: '1',
                step: '1'
              }}
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />

            <TextField
              id="sets"
              name="sets"
              label="Sets"
              value={sets}
              onChange={e => onChange(e)}
              type="number"
              inputProps={{
                min: '1',
                step: '1'
              }}
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
          </div>
        </div>
        <div className="mt-4 progression flex">
          <TextField
            id="progression"
            name="progression"
            label="Progression"
            className="progression-input"
            value={progression}
            onChange={e => onChange(e)}
            type="number"
            inputProps={{
              min: '0',
              step: '0.5'
            }}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
          />
          {superSet === true ? (
            <TextField
              id="totalReps"
              name="totalReps"
              label="Total Reps"
              value={totalReps}
              onChange={e => onChange(e)}
              type="number"
              inputProps={{
                min: '1'
              }}
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
          ) : null}
        </div>
        <div className="mt-4 notes">
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
        <div className="mt-4 flex justify-between flex-grow align-end">
          <button type="submit" className="btn btn-primary btn-sm">
            UPDATE EXERCISE
          </button>
          <Link
            to={`/exercises/${exerciseToEdit.categoryLinkName}/${exerciseToEdit.linkName}`}
          >
            <button type="button" className="btn btn-secondary btn-sm">
              BACK
            </button>
          </Link>
        </div>
      </form>
    </main>
  );
}

EditExercise.propTypes = {
  categories: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
  updateExercise: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.exercises.categories
});

export default connect(mapStateToProps, { setAlert, updateExercise })(
  EditExercise
);
