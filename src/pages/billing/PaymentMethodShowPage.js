import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPaymentMethod } from '../../actions/PaymentMethodActions';

import { PaymentMethodItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class PaymentMethodShowPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchPaymentMethod: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchPaymentMethod } = this.props;
    fetchPaymentMethod(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs editable={false} modelsName="billing" itemID={itemID} />
        <PaymentMethodItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ paymentMethods: { item } }) => ({ item }), { fetchPaymentMethod })(PaymentMethodShowPage);
