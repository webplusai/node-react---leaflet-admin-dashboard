import React, { Component, PropTypes } from 'react';
import cl from 'classnames';

class TextCheckboxField extends Component {

  state = {
    disabled: false
  };

  render() {
    const { input, type, label, placeholder, addon, meta: { touched, error, warning }, afterChange, afterCheckboxChange } = this.props;
    const { disabled } = this.state;

    const inputView = (
      <input
        className="form-control"
        {...input}
        placeholder={placeholder || label}
        type={type}
        disabled={disabled}
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
        <div className="input-group">
          <div className="input-group-addon">
            <input
              type="checkbox"
              checked={disabled}
              onChange={() => this.setState({ disabled: !disabled }, () => {
                input.onChange(null);
                if (afterCheckboxChange) {
                  afterCheckboxChange(this.state.disabled);
                }
              })}
            />
            &nbsp;Free
          </div>
          {inputView}
          {addon ? <div className="input-group-addon">{addon}</div> : null}
        </div>
        {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
      </fieldset>
    );
  }
}

TextCheckboxField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default TextCheckboxField;
