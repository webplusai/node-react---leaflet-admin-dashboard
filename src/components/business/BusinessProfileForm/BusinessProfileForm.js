import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { LinkTo, renderField, renderCheckboxField, WeekdayStartEndList } from '../../../helpers';

class BusinessProfileForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { item, item: { name, phone, hours, neighborhood, reservations, outdoor }, initialize } = this.props;

    if (!isEmpty(item)) {
      initialize({
        name, phone, hours, neighborhood, reservations, outdoor
      });
    }
  }

  render () {
    const { errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(location => onSave(location))}>
        <Field name="name" component={renderField} label="Business Name"/>
        <Field name="phone" component={renderField} label="Phone"/>
        <Field time name="hours" component={WeekdayStartEndList} label="Hours" />
        <Field name="neighborhood" component={renderField} label="Neighborhood" />
        <Field name="reservations" component={renderCheckboxField} label="Takes Reservations?"/>
        <Field name="outdoor" component={renderCheckboxField} label="Outdoor Seating?"/>

        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="business">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    );
  }
}

BusinessProfileForm.defaultProps = {
  item: {}
};

BusinessProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

export default reduxForm({ form: 'businessProfile' })(BusinessProfileForm);