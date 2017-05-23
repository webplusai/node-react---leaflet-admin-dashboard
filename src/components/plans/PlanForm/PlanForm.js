import first from 'lodash/first';
import range from 'lodash/range';
import isEmpty from 'lodash/isEmpty';
import size from 'lodash/size';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Promise from 'bluebird';

import { fetchBundles } from '../../../actions/BundleActions';
import { fetchLocations } from '../../../actions/LocationActions';
import { fetchTags } from '../../../actions/TagActions';

import {
  LinkTo,
  LocationsTimeArray,
  renderField,
  renderCheckboxField,
  renderTextareaField,
  renderDatePicker,
  renderDropdownList,
  renderMultiselect
} from '../../../helpers';
import { weekDays, capitalize } from '../../../utils';

class PlanForm extends Component {
  componentDidMount() {
    const { fetchBundles, fetchTags, fetchLocations } = this.props;
    Promise.all([
      fetchBundles({}),
      fetchTags({}),
      fetchLocations({})
    ]).then(() => this.handleInitialize());
  }

  handleInitialize() {
    const { item, item: {
      bundle,
      title_event, description_event, image, type_event,
      tags, locations,
      partner, start_day, count_attended, is21_age, estimated_cost, end_day,
      reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
      featured, featured_name, featured_link, first_message
    }, initialize } = this.props;

    if (!isEmpty(item)) {
      console.log('locations', locations);
      initialize({
        bundle: bundle ? { objectId: bundle.objectId } : null,
        start_day: (start_day ? start_day.iso : null),
        end_day: (end_day ? end_day.iso : null),
        title_event, description_event, image, type_event,
        tags, locations,
        partner, count_attended, is21_age, estimated_cost,
        reoccur_monday, reoccur_tuesday, reoccur_wednesday, reoccur_thursday, reoccur_friday, reoccur_saturday, reoccur_sunday,
        featured, featured_name, featured_link, first_message
      });
    }
  }

  render () {
    const { item, bundles, locations, tags, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(plan => {onSave(plan)})}>
        <div className="row">
          <div className="col-md-12">
            {errorMessage ? (
                <div className="alert alert-danger">
                  <strong>Oops!</strong> {errorMessage}
                </div>
              ) : null}
            <div className="btn-group">
              <LinkTo className="btn btn-default" url="plans">Cancel</LinkTo>
              <button action="submit" className="btn btn-primary">
                {isEmpty(item) ? 'Create Plan' : 'Update Plan'}
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="bundle"
              valueField="objectId"
              textField="heading"
              component={renderDropdownList}
              data={bundles.map(({ objectId, heading }) => ({ objectId, heading }))}
              label="Bundle"
            />
            <Field name="image" component={renderField} label="URL of banner"/>
            <Field name="title_event" component={renderField} label="Title"/>
            <Field name="description_event" component={renderTextareaField} max={250} label="Description" />
            <Field
              name="tags"
              component={renderMultiselect}
              data={tags.map(({ tag }) => tag)}
              label="Tags"
            />
            <Field
              name="locations"
              valueField="objectId"
              textField="name"
              component={LocationsTimeArray}
              data={locations.map(({ objectId, name, address }) => ({ objectId, name, address }))}
              label="Select Location"
            />
            <Field name="partner" component={renderCheckboxField} label="Partner" />
            <Field
              name="start_day"
              component={renderDatePicker}
              label="Start Day"
            />
            <Field
              name="end_day"
              component={renderDatePicker}
              label="End Day"
            />
            <Field
              name="count_attended"
              component={renderDropdownList}
              data={range(2, 21)}
              label="Number of Attendees"
            />
            <Field
              name="type_event"
              component={renderDropdownList}
              data={[
                'Adventure',
                'Coffee',
                'Dance',
                'Drinks',
                'Food',
                'Ladies Only',
                'Museum',
                'Music',
                'Relax',
                'Sports',
                'Theatre',
                'Tours',
                'VIP',
                'Volunteer',
                'Workout',
                'Test'
              ]}
              label="Experience Type"
            />
            <Field name="is21_age" component={renderCheckboxField} label="Only 21+ Allowed" />
            <Field
              name="estimated_cost"
              component={renderDropdownList}
              data={['FREE', '$', '$$', '$$$', '$$$$', '$$$$$']}
              label="Estimate Cost"
            />
          </div>
          <div className="col-md-6">
            {weekDays.map(day => (
              <Field
                key={day}
                name={`reoccur_${day}`}
                component={renderCheckboxField}
                label={`Every ${capitalize(day)}`}
              />
            ))}
            <Field name="featured" component={renderCheckboxField} label="Featured" />
            <Field name="featured_name" component={renderField} label="Featured Name" />
            <Field name="featured_link" component={renderField} label="Featured Link" />
            <Field name="first_message" component={renderTextareaField} label="First Chat Message" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {errorMessage ? (
                <div className="alert alert-danger">
                  <strong>Oops!</strong> {errorMessage}
                </div>
              ) : null}
            <div className="btn-group">
              <LinkTo className="btn btn-default" url="plans">Cancel</LinkTo>
              <button action="submit" className="btn btn-primary">
                {isEmpty(item) ? 'Create Plan' : 'Update Plan'}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

PlanForm.defaultProps = {
  item: {}
};

PlanForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

function validate(values) {
  const { bundle, description_event, tags, locations } = values;

  const errors = {};

  if (!bundle || isEmpty(bundle)) {
    errors.bundle = 'Bundle is required';
  }

  if (size(tags) === 0) {
    errors.tags = 'Tags are required';
  }

  if (size(locations) === 0) {
    errors.locations = 'Location is required';
  }

  if (description_event && description_event.length > 250) {
    errors.description_event = 'Description must be less 250';
  }

  [
    'title_event',
    'description_event',
    'image',
    'start_day',
    'end_day',
    'count_attended',
    'type_event',
    'estimated_cost'
  ].map(field => {
    if (!values[field]) {
      errors[field] = `${capitalize(first(field.split('_')))} is required`;
    }
  });

  return errors;
}

export default connect(({
  bundles: { items: bundles },
  locations: { items: locations },
  tags: { items: tags }
}) => ({ bundles, locations, tags }), ({ fetchBundles, fetchTags, fetchLocations }))(reduxForm({ form: 'plan', validate })(PlanForm));