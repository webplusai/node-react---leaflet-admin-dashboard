import range from 'lodash/range';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Promise from 'bluebird';

import { fetchLocations } from '../../../actions/LocationActions';

import {
  LinkTo,
  WeekdayStartEndList,
  renderField,
  renderFileUploadField,
  renderTextareaField,
  renderDropdownList,
  renderDatePicker,
  renderCheckboxField
} from '../../../helpers';

class SpecialForm extends Component {

  state = {};

  componentDidMount() {
    const { fetchLocations } = this.props;
    Promise.all([
      fetchLocations({})
    ]).then(() => this.handleInitialize());
  }

  handleInitialize() {
    const {
      item,
      item: {
        incentive_name, category, incentive_type, attendee_min, amount, item_name, description, location,
        redemption_options, promo_code, days, start_date, end_date, without_end_date, image
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      this.setState({
        without_end_date,
        category: isObject(category) ? category.value : null,
        incentive_type: isObject(incentive_type) ? incentive_type.value : null,
        redemption_options: isObject(redemption_options) ? redemption_options.value : null
      });
      initialize({
        incentive_name, category, incentive_type, attendee_min, amount, item_name, description, location,
        redemption_options, promo_code, days, start_date, end_date, without_end_date, image
      });
    }
  }

  render () {
    const { item, locations, errorMessage, handleSubmit, onSave } = this.props;
    const { category, incentive_type, redemption_options, without_end_date } = this.state;

    return (
      <form onSubmit={handleSubmit(special => onSave(special))}>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="incentive_name"
              component={renderField}
              label="Incentive Name"
            />
            <Field
              name="category"
              valueField="value"
              textField="name"
              component={renderDropdownList}
              data={[
                {name: 'Group Rate', value: 'group_rate'},
                {name: 'Special Event', value: 'special_event'},
                {name: 'Birthday', value: 'birthday'},
                {name: 'Happy Hour', value: 'happy_hour'},
                {name: 'Brunch', value: 'brunch'}
              ]}
              label="Category"
              afterChange={({ value }) => this.setState({ category: value })}
            />
            <Field
              name="incentive_type"
              valueField="value"
              textField="name"
              component={renderDropdownList}
              data={[
                {name: 'Fixed Amount', value: 'fixed_amount'},
                {name: '% Discount', value: 'per_cent_discount'},
                {name: 'Free Item', value: 'free_item'},
                {name: 'VIP Benefits', value: 'vip_benefits'}
              ]}
              label="Incentive Type"
              afterChange={({ value }) => this.setState({ incentive_type: value })}
            />
            {category === 'group_rate' ? (
                <Field
                  name="attendee_min"
                  component={renderDropdownList}
                  data={range(2, 21)}
                  label="Attendee Minimum"
                />
              ) : null}
            {(incentive_type === 'vip_benefits') || (incentive_type === 'free_item') ? null : (
                <Field
                  name="amount"
                  component={renderField}
                  type="number"
                  label="Amount"
                  prefix={incentive_type === 'fixed_amount' ? '$' : null}
                  addon={incentive_type === 'per_cent_discount' ? '% off' : null}
                />
              )}
            {incentive_type === 'free_item' || incentive_type === 'vip_benefits' ? (
                <Field name="item_name" component={renderField} label="Item Name" />
              ) : null}
            <Field name="description" component={renderTextareaField} label="Description" />
            <Field
              name="location"
              valueField="objectId"
              textField="name"
              component={renderDropdownList}
              data={locations.map(({ objectId, name }) => ({ objectId, name }))}
              label="Location"
            />
          </div>
          <div className="col-md-6">
            <Field
              name="redemption_options"
              valueField="value"
              textField="name"
              component={renderDropdownList}
              data={incentive_type === 'vip_benefits' ? [{name: 'Mobile Image', value: 'mobile_image'}] : [
                {name: 'Mobile Image', value: 'mobile_image'},
                {name: 'Not Required', value: 'not_required'},
                {name: 'Promo Code', value: 'promo_code'}
              ]}
              label="Redemption Options"
              afterChange={({ value }) => this.setState({ redemption_options: value })}
            />
            {redemption_options === 'mobile_image' ? (
                <Field name="image" component={renderFileUploadField} label="Image Upload" />
              ) : null}
            {redemption_options === 'promo_code' ? (
                <Field name="promo_code" component={renderField} label="Promo Code" />
              ) : null}
            <Field
              time
              name="days"
              component={WeekdayStartEndList}
              label="Start Time"
            />
            <Field
              name="start_date"
              component={renderDatePicker}
              label="Start Date"
            />
            <Field
              name="end_date"
              disabled={without_end_date}
              component={renderDatePicker}
              label="End Date"
            />
            <Field
              name="without_end_date"
              component={renderCheckboxField}
              label="No End Date"
              afterChange={({ target: { checked } }) => this.setState({ without_end_date: checked })}
            />
          </div>
        </div>
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="specials">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create Special' : 'Update Special'}
          </button>
        </div>
      </form>
    );
  }
}

SpecialForm.defaultProps = {
  item: {}
};

SpecialForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

export default connect(({
  locations: { items: locations },
}) => ({ locations }), ({ fetchLocations }))(reduxForm({ form: 'special' })(SpecialForm));