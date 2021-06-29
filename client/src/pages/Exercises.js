import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoriesList from '../components/exercises/CategoriesList';

export default function Exercises({ match }) {
  return (
    <main className="general-main">
      <h2 className="center-text">Exercises</h2>
      <CategoriesList match={match} />
      <div className="flex justify-center">
        <Link to="exercises/create">
          <button type="button" className="btn btn-primary btn-l">
            NEW EXERCISE
          </button>
        </Link>
      </div>
    </main>
  );
}

Exercises.propTypes = {
  match: PropTypes.object.isRequired
};
