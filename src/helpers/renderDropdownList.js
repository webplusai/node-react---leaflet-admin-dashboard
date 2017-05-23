import React, { PropTypes } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import cl from 'classnames';

function renderDropdownList({ input, label, meta: { touched, error, warning }, afterChange, ...rest }) {
  return (
    <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
      {label ? <label>{label}</label> : null}
      <DropdownList
        {...input}
        {...rest}
        onChange={value => {
          input.onChange(value);
          if (afterChange) {
            afterChange(value);
          }
        }}
        filter="contains"
      />
      {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
    </fieldset>
  );
}

renderDropdownList.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderDropdownList;