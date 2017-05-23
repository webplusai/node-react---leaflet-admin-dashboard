import React, { PropTypes } from 'react';
import Multiselect from 'react-widgets/lib/Multiselect'
import cl from 'classnames';

function renderMultiselect({ input, label, meta: { touched, error, warning }, ...rest }) {
  return (
    <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
      {label ? <label>{label}</label> : null}
      <Multiselect
        {...input}
        onBlur={() => input.onBlur()}
        value={input.value || []}
        {...rest}
        filter="contains"
      />
      {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
    </fieldset>
  );
}

renderMultiselect.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderMultiselect;