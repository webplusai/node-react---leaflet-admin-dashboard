import React, { PropTypes } from 'react';
import cl from 'classnames';

function renderField({ input, type, label, placeholder, prefix, addon, meta: { touched, error, warning }, afterChange }) {
  const inputView = (
    <input
      className="form-control"
      {...input}
      placeholder={placeholder || label}
      type={type}
      onChange={value => {
        input.onChange(value);
        if (afterChange) {
          afterChange(value);
        }
      }}
    />
  );

  return (
    <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
      {label ? <label>{label}</label> : null}
      {prefix || addon ? (
          <div className="input-group">
            {prefix ? <div className="input-group-addon">{prefix}</div> : null}
            {inputView}
            {addon ? <div className="input-group-addon">{addon}</div> : null}
          </div>
        ) : inputView}
      {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
    </fieldset>
  );
}

renderField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderField;