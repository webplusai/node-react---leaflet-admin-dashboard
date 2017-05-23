import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Promise from 'bluebird';

import { searchLocation } from '../../../actions/LocationActions';
import { fetchLocationTypes } from '../../../actions/LocationTypeActions';

import {
  LinkTo,
  WeekdayStartEndList,
  YelpFinder,
  renderField,
  renderDropdownList,
  renderCheckboxField
} from '../../../helpers';

const asyncValidate = ({ objectId, yelp_id, }, dispatch) => {
  return dispatch(searchLocation({ yelp_id }))
    .then(({ data: { count } }) => {
      if (!objectId && count > 0) {
        throw { yelp_id: 'That Yelp ID is taken' };
      }
    })
};

class LocationForm extends Component {
  componentDidMount() {
    const { fetchLocationTypes } = this.props;
    Promise.all([
      fetchLocationTypes({})
    ]).then(() => this.handleInitialize());
  }

  handleInitialize() {
    const {
      item,
      item: {
        objectId, yelp_id, name, address, phone, category, neighborhood, opentable_id, metro_city, metro_city2, hours, reservations,
        latitude, longitude, rating, groups, outdoor, location_type, verified
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      initialize({
        objectId, yelp_id, name, address, phone, category, neighborhood, opentable_id, metro_city,
        metro_city2,
        hours, reservations, latitude, longitude, rating, groups, outdoor, location_type, verified
      });
    } else {
      initialize({
        metro_city2: { name: 'New York', value: 'new_york' }
      })
    }
  }

  render () {
    const { item, locationTypes, errorMessage, handleSubmit, onSave, initialize } = this.props;

    return (
      <form onSubmit={handleSubmit(location => onSave(location))}>
        <div className="row">
          <div className="col-md-6">
            <Field
              name="yelp"
              component={YelpFinder}
              label="Add from Yelp"
              onSelect={({ id, name, categories, location, display_phone, rating, coordinates, hours, neighborhoods }) => initialize({
                yelp_id: id,
                name,
                address: isObject(location) ? compact([location.address1, location.address2, location.address3]).join(', ') : null,
                phone: display_phone,
                category: (categories || []).map(c => c.title).join(', '),
                neighborhood: (neighborhoods || []).join(', '),
                metro_city: isObject(location) ? compact([location.city, location.state]).join(', ') : null,
                latitude: isObject(coordinates) ? coordinates.latitude : null,
                longitude: isObject(coordinates) ? coordinates.longitude : null,
                rating,
                hours
              })}
            />
            <div className="btn-group m-b">
              <LinkTo className="btn btn-default" url="locations">Cancel</LinkTo>
              <button action="submit" className="btn btn-primary">
                {isEmpty(item) ? 'Create Location' : 'Update Location'}
              </button>
            </div>

            <Field name="yelp_id" component={renderField} label="Yelp ID" />
            <Field
              name="location_type"
              valueField="objectId"
              textField="name"
              component={renderDropdownList}
              data={locationTypes.map(({ objectId, name }) => ({ objectId, name }))}
              label="Location Type"
            />
            <Field name="name" component={renderField} label="Location Name" />
            <Field name="address" component={renderField} label="Address" />
            <Field name="phone" component={renderField} label="Phone" />
            <Field name="category" component={renderField} label="Category" />
            <Field name="neighborhood" component={renderField} label="Neighborhood" />
            <Field name="opentable_id" component={renderField} label="Opentable ID" />
          </div>
          <div className="col-md-6">
            <Field name="metro_city" component={renderField} label="City"/>
            <Field
              name="metro_city2"
              valueField="value"
              textField="name"
              component={renderDropdownList}
              data={[
                {name: 'New York', value: 'new_york'},
                {name: 'San Francisco', value: 'san_francisco'},
                {name: 'Houston', value: 'houston'},
                {name: 'Chicago', value: 'chicago'},
                {name: 'Atlanta', value: 'atlanta'},
                {name: 'Austin', value: 'austin'},
                {name: 'Washington', value: 'washington'},
                {name: 'DC', value: 'dc'},
                {name: 'Boston', value: 'boston'},
                {name: 'Los Angeles', value: 'los_angeles'},
                {name: 'Orlando', value: 'orlando'},
                {name: 'Miami', value: 'miami'},
              ]}
              label="Metro City"
            />
            <Field
              time
              name="hours"
              component={WeekdayStartEndList}
              label="Hours of operations"
            />
            <Field name="reservations" component={renderCheckboxField} label="Takes Reservations?"/>
            <Field name="latitude" component={renderField} label="Latitude"/>
            <Field name="longitude" component={renderField} label="Longitude"/>
            <Field name="rating" component={renderField} label="Rating"/>
            <Field name="outdoor" component={renderCheckboxField} label="Outdoor Seating?"/>
            <Field name="verified" component={renderCheckboxField} label="Verified?"/>
          </div>
        </div>
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="locations">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create Location' : 'Update Location'}
          </button>
        </div>
      </form>
    );
  }
}

LocationForm.defaultProps = {
  item: {}
};

LocationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

function validate({ yelp_id, location_type, ...rest }) {
  const errors = {};

  if (!isEmpty(rest)) {
    if (!yelp_id) {
      errors.yelp_id = 'Yelp ID is required';
    }

    if (!location_type) {
      errors.location_type = 'Location Type is required';
    }
  }

  return errors;
}

export default connect(({
  locationTypes: { items: locationTypes }
}) => ({ locationTypes }), ({ fetchLocationTypes }))(reduxForm({ form: 'location', validate, asyncValidate })(LocationForm));