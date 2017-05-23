import moment from 'moment';
import React, { PropTypes } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import cl from 'classnames';

momentLocalizer(moment);

function renderDateTimePicker({ input, label, meta: { touched, error, warning }, ...rest }) {

  return (
    <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
      {label ? <label>{label}</label> : null}
      <DateTimePicker
        {...input}
        format={'MM/DD/YYYY hh:mm:ss'}
        onBlur={() => input.onBlur()}
        value={input.value ? moment(input.value).toDate() : null}
        {...rest}
      />
      {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
    </fieldset>
  );
}

renderDateTimePicker.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderDateTimePicker;