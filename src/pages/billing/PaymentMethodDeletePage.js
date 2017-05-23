import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deletePaymentMethod } from '../../actions/PaymentMethodActions';

import { PaymentMethodDelete } from '../../components';
import { Tabs } from '../../helpers';

class PaymentMethodDeletePage extends Component {
  render() {
    const { params: { itemID }, deletePaymentMethod } = this.props;
    return (
      <div className="container">
        <Tabs editable={false} modelsName="billing" itemID={itemID} />
        <PaymentMethodDelete itemID={itemID} onDelete={id => deletePaymentMethod(id)} />
      </div>
    );
  }
}

export default connect(null, { deletePaymentMethod })(PaymentMethodDeletePage);