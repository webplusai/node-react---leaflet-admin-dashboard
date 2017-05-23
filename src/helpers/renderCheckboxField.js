import React, { PropTypes } from 'react';
import cl from 'classnames';

function renderCheckboxField({ input, label, meta: { touched, error, warning }, afterChange }) {
  return (
    <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
      <label>
        <input
          className="form-control-checkbox"
          checked={input.value}
          {...input}
          type="checkbox"
          onChange={value => {
            input.onChange(value);
            if (afterChange) {
              afterChange(value);
            }
          }}
        />
        {label}
      </label>
      {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
    </fieldset>
  );
}

renderCheckboxField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderCheckboxField;