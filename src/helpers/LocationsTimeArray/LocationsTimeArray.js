import size from 'lodash/size';
import isArray from 'lodash/isArray';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList'
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import cl from 'classnames';

import { NameAddressItem, NameAddressValue } from './helpers';
import { Button } from '../../helpers';

momentLocalizer(moment);

export default class LocationsTimeArray extends Component {

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
    const { input, label, meta: { touched, error, warning }, data } = this.props;
    const { value, values } = this.state;

    return (
      <fieldset className={cl('form-group', {'has-error': (touched && error)})}>
        {label ? <label>{label}</label> : null}
        <table className="table table-hover table-striped table-bordered">
          <tbody>
          <tr>
            <td className="wide-td-md">
              <DropdownList
                valueField="value"
                textField="name"
                data={data}
                filter="contains"
                value={value.location ? value.location.name : null}
                itemComponent={NameAddressItem}
                valueComponent={NameAddressValue}
                onChange={location => this.setState({ value: { ...value, location } })}
              />
            </td>
            <td>
              <DateTimePicker
                calendar={false}
                value={value.time ? moment(value.time, 'hh:mm A').toDate() : null}
                onChange={(_, time) => this.setState({ value: { ...value, time } })}
              />
            </td>
            <td>
              <Button
                color="primary"
                disabled={!value.location || !value.time}
                onClick={() => this.setState({ value: {}, values: [...values, value] }, () => input.onChange(this.state.values))}
              >
                Add
              </Button>
            </td>
          </tr>
          {values.map((val, index) => (
            <tr key={index}>
              <td>{val.location ? val.location.name : null}</td>
              <td>{val.time}</td>
              <td>
                <Button
                  color="danger"
                  onClick={() =>
                    this.setState({
                      values: values.filter(({ location, time }) => (val.location !== location && val.time !== time))
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
