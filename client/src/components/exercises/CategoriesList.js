import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { saveCategory } from '../../actions/exercises';

function CategoriesList({ match, categories, saveCategory }) {
  const [open, setOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState({ name: '' });

  const onChange = e => setCategoryInput({ name: e.target.value });

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleSubmit() {
    saveCategory(categoryInput);
    setOpen(false);
  }

  return (
    <div className="exercise-categories">
      <h3 className="mb-2">Categories:</h3>
      <ul className="categories">
        {categories.map(category => (
          <Link
            key={`Link ${category.name}`}
            to={{
              pathname: `${match.url}/${category.linkName}`,
              categoryName: category.name
            }}
          >
            <li className="category" key={category.id}>
              {category.name}
            </li>
          </Link>
        ))}
        <li>
          <button
            onClick={handleClickOpen}
            className="btn btn-secondary btn-link"
            type="button"
          >
            NEW CATEGORY
          </button>
        </li>
      </ul>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-label="Add category dialog"
      >
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            onChange={e => onChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-xs btn-primary"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-xs btn-secondary"
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,
  saveCategory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  categories: state.exercises.categories
});

export default connect(mapStateToProps, { saveCategory })(CategoriesList);
