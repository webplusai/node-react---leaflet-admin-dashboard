import React, { PropTypes } from 'react';
import cl from 'classnames';

function renderTextareaField({ input, type, label, placeholder, max, meta: { touched, error, warning } }) {
  return (
    <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
      {label ? <label>{label}</label> : null}
      <textarea className="form-control" {...input} placeholder={placeholder || label} type={type} />
      {max ? <div className="help-block">{input.value ? input.value.length : 0} of {max}</div> : null}
      {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
    </fieldset>
  );
}

renderTextareaField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderTextareaField;