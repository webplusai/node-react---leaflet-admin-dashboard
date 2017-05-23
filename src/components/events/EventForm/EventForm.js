import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Promise from 'bluebird';

import { fetchEventTypes } from '../../../actions/EventTypeActions';
import { fetchLocations } from '../../../actions/LocationActions';
import { fetchSpecials } from '../../../actions/SpecialActions';

import {
  LinkTo,
  DateNameStartEndList,
  TextCheckboxField,
  EventbriteFinder,
  renderTextareaField,
  renderDropdownList,
  renderDateTimePicker,
  renderCheckboxField
} from '../../../helpers';

class EventForm extends Component {

  state = {};

  componentDidMount() {
    const { currentUser, fetchEventTypes, fetchLocations, fetchSpecials } = this.props;
    Promise.all([
      fetchEventTypes({}),
      fetchLocations({}),
      fetchSpecials({}, currentUser)
    ]).then(() => this.handleInitialize());
  }

  handleInitialize() {
    const {
      item,
      item: {
        event_type, dates, start_time, end_time, location, description, redemption, eventbrite, cost,
        add_criteria, gender, age, comments_for_reviewer, boost_status, special
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      this.setState({ add_criteria, redemption: redemption ? redemption.value : null }, () => initialize({
        event_type, dates, start_time, end_time, location, description, redemption, eventbrite, cost,
        add_criteria, gender, age, comments_for_reviewer, boost_status, special
      }));
    }
  }

  render () {
    const { item, eventTypes, locations, specials, errorMessage, handleSubmit, onSave } = this.props;
    const { add_criteria, redemption } = this.state;

    return (
      <form onSubmit={handleSubmit(event => {onSave(event)})}>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="event_type"
              valueField="objectId"
              textField="name"
              component={renderDropdownList}
              data={eventTypes.map(({ objectId, name }) => ({ objectId, name }))}
              label="Location Type"
            />
            <Field
              name="dates"
              component={DateNameStartEndList}
              label="Dates"
              placeholder="Event Name"
            />
            <Field
              name="start_time"
              component={renderDateTimePicker}
              label="Start Time"
            />
            <Field
              name="end_time"
              component={renderDateTimePicker}
              label="End Time"
            />
            <Field
              name="location"
              valueField="objectId"
              textField="name"
              component={renderDropdownList}
              data={locations.map(({ objectId, name }) => ({ objectId, name }))}
              label="Location"
            />
            <Field name="description" component={renderTextareaField} label="Description"/>
          </div>
          <div className="col-md-6">
            <Field
              name="redemption"
              valueField="value"
              textField="name"
              component={renderDropdownList}
              data={[
                {name: 'Advance Tickets', value: 'advance_tickets'},
                {name: 'Only Pay at Door', value: 'only_pay_at_door'},
                {name: 'Not Required', value: 'not_required'}
              ]}
              label="Redemption"
              afterChange={({ value }) => this.setState({ redemption: value })}
            />
            {redemption === 'advance_tickets' ? (
              <Field
                name="eventbrite"
                component={EventbriteFinder}
                label="Eventbrite"
                placeholder="Select Event"
              />
            ) : null}
            <Field
              name="cost"
              component={TextCheckboxField}
              label="Cost"
              addon=".00"
            />
            <Field
              name="add_criteria"
              component={renderCheckboxField}
              label="Add Criteria?"
              afterChange={({ target: { checked } }) => this.setState({ add_criteria: checked })}
            />
            {add_criteria ? (
              <Field
                name="gender"
                valueField="value"
                textField="name"
                component={renderDropdownList}
                data={[
                  {name: 'Male', value: 'male'},
                  {name: 'Female', value: 'female'},
                  {name: 'Any', value: 'any'},
                ]}
                label="Gender Criteria"
              />
              ) : null}
            {add_criteria ? (
              <Field
                name="age"
                valueField="value"
                textField="name"
                component={renderDropdownList}
                data={[
                  {name: '18-24', value: '18-24'},
                  {name: '25-35', value: '25-35'},
                  {name: '35+', value: '35+'},
                  {name: 'Any', value: 'any'}
                ]}
                label="Age Criteria"
              />
              ) : null}
            <Field
              name="special"
              valueField="objectId"
              textField="incentive_name"
              component={renderDropdownList}
              data={specials.map(({ objectId, incentive_name }) => ({ objectId, incentive_name }))}
              label="Special"
            />
          </div>
        </div>
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="events">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create Event' : 'Update Event'}
          </button>
        </div>
      </form>
    );
  }
}

EventForm.defaultProps = {
  item: {}
};

EventForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};


export default connect(({
  auth: { currentUser },
  eventTypes: { items: eventTypes },
  specials: { items: specials },
  locations: { items: locations },
}) => ({ eventTypes, locations, specials, currentUser }), ({ fetchEventTypes, fetchLocations, fetchSpecials }))(reduxForm({ form: 'event' })(EventForm));