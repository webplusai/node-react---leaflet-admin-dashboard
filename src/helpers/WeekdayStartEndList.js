import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import size from 'lodash/size';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import { Checkbox } from 'react-bootstrap';
import cl from 'classnames';

import { Button } from '../helpers';
import { weekDays, numberOfWeekDay, capitalize } from '../utils';

momentLocalizer(moment);

export default class WeekdayStartEndList extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    label: PropTypes.string,
    type: PropTypes.string
  };

  state = {
    value: {
      allDay: false
    },
    values: []
  };

  componentWillReceiveProps(nextProps) {
    if (isArray(nextProps.input.value) && size(nextProps.input.value) > 0) {
      this.setState({ values: nextProps.input.value })
    }
  }

  render() {
    const { input, label, time, meta: { touched, error, warning } } = this.props;
    const { value, values } = this.state;

    return (
      <fieldset className={cl('form-group', {'has-error': (touched && error)})}>
        {label ? <label>{label}</label> : null}
        <table className="table table-hover table-striped table-bordered">
          <tbody>
          <tr>
            <td className="wide-td">
              <DropdownList
                valueField="value"
                textField="name"
                data={weekDays.map(day => ({ name: capitalize(day), value: day }))}
                filter="contains"
                value={isNumber(value.day) ? capitalize(weekDays[value.day]) : null}
                onChange={day => this.setState({ value: { ...value, day: numberOfWeekDay(day.value) } })}
              />
            </td>
            <td>
              {time ? (
                  <DateTimePicker
                    calendar={false}
                    disabled={value.allDay}
                    value={value.start ? moment(value.start, 'HHmm').toDate() : null}
                    onChange={(_, start) =>
                      this.setState({ value: { ...value, start: moment(start, 'hh:mm A').format('HHmm') } })
                    }
                  />
                ) : (
                  <DateTimePicker
                    format={'MM/DD/YYYY hh:mm:ss'}
                    value={value.start ? moment(value.start, 'MM/DD/YYYY hh:mm:ss').toDate() : null}
                    onChange={(_, start) => this.setState({ value: { ...value, start } })}
                  />
                )}
            </td>
            <td>
              {time ? (
                  <DateTimePicker
                    calendar={false}
                    disabled={value.allDay}
                    value={value.end ? moment(value.end, 'HHmm').toDate() : null}
                    onChange={(_, end) =>
                      this.setState({ value: { ...value, end: moment(end, 'hh:mm A').format('HHmm') } })
                    }
                  />
                ) : (
                  <DateTimePicker
                    format={'MM/DD/YYYY hh:mm:ss'}
                    value={value.end ? moment(value.end, 'MM/DD/YYYY hh:mm:ss').toDate() : null}
                    onChange={(_, end) => this.setState({ value: { ...value, end } })}
                  />
                )}
            </td>
            <td>
              <Checkbox
                checked={value.allDay}
                onChange={({ target: { checked } }) =>
                  this.setState({ value: { ...value, allDay: checked, start: '0000', end: '2359' } })
                }>
                All day
              </Checkbox>
            </td>
            <td>
              <Button
                color="primary"
                disabled={!isNumber(value.day) || !value.start || !value.end}
                onClick={() => this.setState({ value: {}, allDay: false, values: [...values, value] }, () => input.onChange(this.state.values))}
              >
                Add
              </Button>
            </td>
          </tr>
          {values.map((val, index) => (
            <tr key={index}>
              <td>{capitalize(weekDays[val.day])}</td>
              <td>{moment(val.start, 'HHmm').format('hh:mm A')}</td>
              <td>{moment(val.end, 'HHmm').format('hh:mm A')}</td>
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
