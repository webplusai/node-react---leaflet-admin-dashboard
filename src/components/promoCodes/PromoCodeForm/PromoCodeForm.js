import isEmpty from 'lodash/isEmpty';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Promise from 'bluebird';

import { fetchLocationTypes } from '../../../actions/LocationTypeActions';

import {
  LinkTo,
  renderField,
  renderMultiselect
} from '../../../helpers';

class PromoCodeForm extends Component {
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
        name, amount, location_types
      },
      initialize
    } = this.props;

    if (!isEmpty(item)) {
      initialize({
        name, amount, location_types
      });
    }
  }

  render () {
    const { item, locationTypes, errorMessage, handleSubmit, onSave } = this.props;
    return (
      <form onSubmit={handleSubmit(promoCode => onSave(promoCode))}>
        <div className="row">
          <div className="col-md-6">
            <Field name="name" component={renderField} label="PromoCode" />
            <Field name="amount" component={renderField} label="Amount" />
            <Field
              name="location_types"
              valueField="objectId"
              textField="name"
              component={renderMultiselect}
              data={locationTypes.map(({ objectId, name }) => ({ objectId, name }))}
              label="Location Types"
            />
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
          <LinkTo className="btn btn-default" url="promoCodes">Cancel</LinkTo>
          <button action="submit" className="btn btn-primary">
            {isEmpty(item) ? 'Create PromoCode' : 'Update PromoCode'}
          </button>
        </div>
      </form>
    );
  }
}

PromoCodeForm.defaultProps = {
  item: {}
};

PromoCodeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  item: PropTypes.shape({
    objectId: PropTypes.string
  })
};

export default connect(({
  locationTypes: { items: locationTypes }
}) => ({ locationTypes }), ({ fetchLocationTypes }))(reduxForm({ form: 'promoCode' })(PromoCodeForm));