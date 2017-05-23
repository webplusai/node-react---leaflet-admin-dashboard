import isArray from 'lodash/isArray';
import size from 'lodash/size';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import cl from 'classnames';

import { Button } from '../helpers';

momentLocalizer(moment);

export default class DateStartEndList extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string
  };

  state = {
    value: {},
    values: []
  };

  componentWillReceiveProps(nextProps) {
    if (isArray(nextProps.input.value) && size(nextProps.input.value) > 0) {
      this.setState({ values: nextProps.input.value })
    }
  }

  render() {
    const { input, label, meta: { touched, error, warning } } = this.props;
    const { value, values } = this.state;

    return (
      <fieldset className={cl('form-group', {'has-error': (touched && error)})}>
        {label ? <label>{label}</label> : null}
        <table className="table table-hover table-striped table-bordered">
          <tbody>
          <tr>
            <td>
              <DateTimePicker
                time={false}
                format={'MM/DD/YYYY'}
                value={value.date ? moment(value.date, 'MM/DD/YYYY').toDate() : null}
                onChange={(_, date) => this.setState({ value: { ...value, date } })}
              />
            </td>
            <td>
              <DateTimePicker
                calendar={false}
                value={value.start ? moment(value.start, 'hh:mm A').toDate() : null}
                onChange={(_, start) => this.setState({ value: { ...value, start } })}
              />
            </td>
            <td>
              <DateTimePicker
                calendar={false}
                value={value.end ? moment(value.end, 'hh:mm A').toDate() : null}
                onChange={(_, end) => this.setState({ value: { ...value, end } })}
              />
            </td>
            <td>
              <Button
                color="primary"
                disabled={!value.date || !value.start || !value.end}
                onClick={() => this.setState({ value: {}, values: [...values, value] }, () => input.onChange(this.state.values))}
              >
                Add
              </Button>
            </td>
          </tr>
          {values.map((val, index) => (
            <tr key={index}>
              <td>{val.date}</td>
              <td>{val.start}</td>
              <td>{val.end}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() =>
                    this.setState({
                      values: values.filter(({ day, start, end }) => (val.day !== day && val.start !== start && val.end !== end))
                    }, () => input.onChange(this.state.values))
                  }
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
      </fieldset>
    );
  }
}
