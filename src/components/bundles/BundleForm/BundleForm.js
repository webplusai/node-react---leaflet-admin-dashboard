import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { LinkTo, renderField } from '../../../helpers';

class BundleForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { item, item: { heading, banner }, initialize } = this.props;

    if (!isEmpty(item)) {
      initialize({
        heading,
        banner
      });
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(bundle => {onSave(bundle)})}>
        <Field name="banner" component={renderField} label="URL of banner"/>
        <Field name="heading" component={renderField} label="Name / Title"/>
        {errorMessage ? (
            <div className="alert alert-danger">
              <strong>Oops!</strong> {errorMessage}
            </div>
          ) : null}
        <div className="btn-group">
          <LinkTo className="btn btn-default" url="bundles">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create Bundle' : 'Update Bundle'}
          </button>
        </div>
      </form>
    );
  }
}

BundleForm.defaultProps = {
  item: {}
};

BundleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string,
    heading: PropTypes.string,
    banner: PropTypes.string,
  })
};

export default reduxForm({ form: 'bundle' })(BundleForm);