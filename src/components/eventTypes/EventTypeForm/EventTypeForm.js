import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  LinkTo,
  renderField,
} from '../../../helpers';

class EventTypeForm extends Component {
  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize() {
    const {
      item,
      item: {
        name
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      initialize({
        name
      });
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave } = this.props;
    return (
      <form onSubmit={handleSubmit(eventType => onSave(eventType))}>
        <div className="row">
          <div className="col-md-6">
            <Field name="name" component={renderField} label="EventType Name" />
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
          <LinkTo className="btn btn-default" url="eventTypes">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create EventType' : 'Update EventType'}
          </button>
        </div>
      </form>
    );
  }
}

EventTypeForm.defaultProps = {
  item: {}
};

EventTypeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

export default reduxForm({ form: 'eventType' })(EventTypeForm);