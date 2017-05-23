import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  LinkTo,
  renderField,
} from '../../../helpers';

class LocationTypeForm extends Component {
  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize() {
    const {
      item,
      item: {
        name, price_per_invite_sent, price_per_invite_accepted, price_per_attendee, price_per_ticket_sold
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      initialize({
        name, price_per_invite_sent, price_per_invite_accepted, price_per_attendee, price_per_ticket_sold
      });
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave } = this.props;
    return (
      <form onSubmit={handleSubmit(locationType => onSave(locationType))}>
        <div className="row">
          <div className="col-md-6">
            <Field name="name" component={renderField} label="Location Type Name" />
            <Field name="price_per_invite_sent" component={renderField} label="Price per invite sent" />
            <Field name="price_per_invite_accepted" component={renderField} label="Price per invite accepted" />
            <Field name="price_per_attendee" component={renderField} label="Price per attendee" />
            <Field name="price_per_ticket_sold" component={renderField} label="Price per ticket sold" />
          </div>
          <div className="col-md-6">

          </div>
        </div>
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="locationTypes">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create LocationType' : 'Update LocationType'}
          </button>
        </div>
      </form>
    );
  }
}

LocationTypeForm.defaultProps = {
  item: {}
};

LocationTypeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

export default reduxForm({ form: 'locationType' })(LocationTypeForm);