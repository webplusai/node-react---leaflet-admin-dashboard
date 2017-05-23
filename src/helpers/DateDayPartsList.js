import isArray from 'lodash/isArray';
import size from 'lodash/size';
import without from 'lodash/without';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Multiselect from 'react-widgets/lib/Multiselect'
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import cl from 'classnames';

import { Button } from '../helpers';

momentLocalizer(moment);

export default class DateDayPartsList extends Component {

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
              <Multiselect
                valueField="id"
                textField="name"
                value={value.parts}
                data={[
                  { id: '0600_1000', name: 'Morning (6:00 AM to 10:00 AM)' },
                  { id: '1001_1400', name: 'Noon (10:01 AM to 2:00 PM)' },
                  { id: '1401_1800', name: 'Afternoon (2:01 PM to 6:00 PM)' },
                  { id: '1801_2200', name: 'Evening (6:01 PM to 10:00 PM)' },
                  { id: '2201_0200', name: 'Late (10:01 PM to 2:00 AM)' },
                ]}
                onChange={(parts, ...rest) => this.setState({ value: { ...value, parts } })}
              />
            </td>
            <td>
              <Button
                color="primary"
                disabled={!value.date || (size(value.parts) === 0)}
                onClick={() => this.setState({ value: {}, values: [...values, value] }, () => input.onChange(this.state.values))}
              >
                Add
              </Button>
            </td>
          </tr>
          {values.map((val, index) => (
            <tr key={index}>
              <td>{val.date}</td>
              <td>{(val.parts || []).map(part => part.name).join(', ')}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() => this.setState({
                    values: without(values, val)
                  }, () => input.onChange(this.state.values))}
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
