import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { LinkTo, renderField } from '../../../helpers';

class ProfileForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { currentUser, currentUser: { first_name, last_name, personal_phone, job_title }, initialize } = this.props;

    if (!isEmpty(currentUser)) {
      initialize({
        first_name, last_name, personal_phone, job_title
      });
    }
  }

  render () {
    const { errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(user => onSave(user))}>
        <Field name="first_name" component={renderField} label="First Name"/>
        <Field name="last_name" component={renderField} label="Last Name" />
        <Field name="personal_phone" component={renderField} label="Personal Phone Number"/>
        <Field name="job_title" component={renderField} label="Job Title" />
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="profile">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    );
  }
}

ProfileForm.defaultProps = {
  currentUser: {}
};

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    objectId: PropTypes.string
  })
};

export default reduxForm({ form: 'profile' })(ProfileForm);