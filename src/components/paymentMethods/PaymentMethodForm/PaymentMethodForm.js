import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  LinkTo,
  renderField,
} from '../../../helpers';

class PaymentMethodForm extends Component {

  state = {};

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const {
      item,
      item: {
        number, exp_year, exp_month, cvc
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      initialize({
        number, exp_year, exp_month, cvc
      });
    }
  }

  render () {
    const { item, errorMessage, handleSubmit, onSave } = this.props;

    return (
      <form onSubmit={handleSubmit(paymentMethod => onSave(paymentMethod))}>
        <div className="row">
          <div className="col-md-6">
            <Field name="number" component={renderField} label="Number" />
            <Field name="exp_year" component={renderField} label="Year" />
            <Field name="exp_month" component={renderField} label="Month" />
            <Field name="cvc" component={renderField} label="CVC" />
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
          <LinkTo className="btn btn-default" url="billing">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create PaymentMethod' : 'Update PaymentMethod'}
          </button>
        </div>
      </form>
    );
  }
}

PaymentMethodForm.defaultProps = {
  item: {}
};

PaymentMethodForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

export default reduxForm({ form: 'paymentMethod' })(PaymentMethodForm);