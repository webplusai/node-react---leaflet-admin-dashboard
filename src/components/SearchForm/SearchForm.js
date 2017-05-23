import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import { renderField } from '../../helpers';

function SearchForm({ handleSubmit, reset, onSearch }) {
  return (
    <form className="form-inline" onSubmit={handleSubmit(search => onSearch(search))}>
      <Field name="search" component={renderField} placeholder="Search"/>
      <div className="btn-group">
        <button action="submit" className="btn btn-primary">
          Search
        </button>
        <button className="btn btn-default" onClick={reset}>Clear</button>
      </div>
    </form>
  );
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default reduxForm({ form: 'search' })(SearchForm);