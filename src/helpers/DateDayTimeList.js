import isArray from 'lodash/isArray';
import without from 'lodash/without';
import size from 'lodash/size';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import cl from 'classnames';

import { Button } from '../helpers';

momentLocalizer(moment);

export default class DateDayTimeList extends Component {

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
              <td>Date</td>
              <td colSpan="2">
                <DateTimePicker
                  time={false}
                  format={'MM/DD/YYYY'}
                  value={value.date ? moment(value.date, 'MM/DD/YYYY').toDate() : null}
                  onChange={(_, date) => this.setState({ value: { ...value, date } })}
                />
              </td>
            </tr>
            <tr>
              <td>Morning</td>
              <td>
                <DateTimePicker
                  calendar={false}
                  min={moment('06:00', 'HH:mm').toDate()}
                  max={moment('10:00', 'HH:mm').toDate()}
                  value={value.morning_start ? moment(value.morning_start, 'hh:mm A').toDate() : null}
                  onChange={(_, morning_start) => this.setState({ value: { ...value, morning_start } })}
                />
              </td>
              <td>
                <DateTimePicker
                  calendar={false}
                  min={moment('06:00', 'HH:mm').toDate()}
                  max={moment('10:00', 'HH:mm').toDate()}
                  value={value.morning_end ? moment(value.morning_end, 'hh:mm A').toDate() : null}
                  onChange={(_, morning_end) => this.setState({ value: { ...value, morning_end } })}
                />
              </td>
            </tr>
            <tr>
              <td>Noon</td>
              <td>
                <DateTimePicker
                  calendar={false}
                  min={moment('10:00', 'HH:mm').toDate()}
                  max={moment('14:00', 'HH:mm').toDate()}
                  value={value.noon_start ? moment(value.noon_start, 'hh:mm A').toDate() : null}
                  onChange={(_, noon_start) => this.setState({ value: { ...value, noon_start } })}
                />
              </td>
              <td>
                <DateTimePicker
                  calendar={false}
                  min={moment('10:00', 'HH:mm').toDate()}
                  max={moment('14:00', 'HH:mm').toDate()}
                  value={value.noon_end ? moment(value.noon_end, 'hh:mm A').toDate() : null}
                  onChange={(_, noon_end) => this.setState({ value: { ...value, noon_end } })}
                />
              </td>
            </tr>
            <tr>
              <td>Afternoon</td>
              <td>
                <DateTimePicker
                  calendar={false}
                  min={moment('14:00', 'HH:mm').toDate()}
                  max={moment('18:00', 'HH:mm').toDate()}
                  value={value.afternoon_start ? moment(value.afternoon_start, 'hh:mm A').toDate() : null}
                  onChange={(_, afternoon_start) => this.setState({ value: { ...value, afternoon_start } })}
                />
              </td>
              <td>
                <DateTimePicker
                  calendar={false}
                  min={moment('14:00', 'HH:mm').toDate()}
                  max={moment('18:00', 'HH:mm').toDate()}
                  value={value.afternoon_end ? moment(value.afternoon_end, 'hh:mm A').toDate() : null}
                  onChange={(_, afternoon_end) => this.setState({ value: { ...value, afternoon_end } })}
                />
              </td>
            </tr>
            <tr>
              <td>Evening</td>
              <td>
                <DateTimePicker
                  calendar={false}
                  min={moment('18:00', 'HH:mm').toDate()}
                  max={moment('22:00', 'HH:mm').toDate()}
                  value={value.evening_start ? moment(value.evening_start, 'hh:mm A').toDate() : null}
                  onChange={(_, evening_start) => this.setState({ value: { ...value, evening_start } })}
                />
              </td>
              <td>
                <DateTimePicker
                  calendar={false}
                  min={moment('18:00', 'HH:mm').toDate()}
                  max={moment('22:00', 'HH:mm').toDate()}
                  value={value.evening_end ? moment(value.evening_end, 'hh:mm A').toDate() : null}
                  onChange={(_, evening_end) => this.setState({ value: { ...value, evening_end } })}
                />
              </td>
            </tr>
            <tr>
              <td>Late</td>
              <td>
                <DateTimePicker
                  calendar={false}
                  min={moment('22:00', 'HH:mm').toDate()}
                  max={moment('02:00', 'HH:mm').add(24, 'hours').toDate()}
                  value={value.late_start ? moment(value.late_start, 'hh:mm A').toDate() : null}
                  onChange={(_, late_start) => this.setState({ value: { ...value, late_start } })}
                />
              </td>
              <td>
                <DateTimePicker
                  calendar={false}
                  min={moment('22:00', 'HH:mm').toDate()}
                  max={moment('02:00', 'HH:mm').add(24, 'hours').toDate()}
                  value={value.late_end ? moment(value.late_end, 'hh:mm A').toDate() : null}
                  onChange={(_, late_end) => this.setState({ value: { ...value, late_end } })}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <Button
                  color="primary"
                  disabled={
                    !value.date &&
                    !(
                      (value.morning_start && value.morning_end) ||
                      (value.noon_start && value.noon_end) ||
                      (value.afternoon_start && value.afternoon_start) ||
                      (value.evening_start && value.evening_end) ||
                      (value.late_start && value.late_end)
                    )
                  }
                  onClick={() => this.setState({ value: {}, values: [...values, value] }, () => input.onChange(this.state.values))}
                >
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        {size(values) > 0 ? (
            <table className="table table-hover table-striped table-bordered">
              <thead>
              <tr>
                <th>Date</th>
                <th colSpan="2">Morning</th>
                <th colSpan="2">Noon</th>
                <th colSpan="2">Afternoon</th>
                <th colSpan="2">Evening</th>
                <th colSpan="2">Late</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {values.map((val, index) => (
                <tr key={index}>
                  <td>{val.date}</td>
                  <td>{val.morning_start}</td>
                  <td>{val.morning_end}</td>
                  <td>{val.noon_start}</td>
                  <td>{val.noon_end}</td>
                  <td>{val.afternoon_start}</td>
                  <td>{val.afternoon_end}</td>
                  <td>{val.evening_start}</td>
                  <td>{val.evening_end}</td>
                  <td>{val.late_start}</td>
                  <td>{val.late_end}</td>
                  <td>
                    <Button
                      color="danger"
                      onClick={() => this.setState({ values: without(values, val) }, () => input.onChange(this.state.values))}
                    >Remove</Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          ) : null}
        {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
      </fieldset>
    );
  }
}
