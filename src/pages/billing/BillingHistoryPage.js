import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPaymentHistory } from '../../actions/PaymentMethodActions';

import { BillingTabs, PaymentsHistory } from '../../components';
import { Loading } from '../../helpers';

class PaymentMethodsIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchPaymentHistory: PropTypes.func.isRequired
  };

  state = {
    fetched: false,
    search: '',
    order: '-createdAt',
  };

  componentDidMount() {
    const { order } = this.state;
    this.fetchData({ order });
  }

  fetchData({ search, order, filters }) {
    const { fetchPaymentHistory } = this.props;
    this.setState({ search, fetched: false }, () => fetchPaymentHistory({ order, search, filters })
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items } = this.props;
    const { fetched } = this.state;

    return (
      <div className="container">
        <div className="row m-b">
          <BillingTabs active="billing/history" />
        </div>
        <Loading loaded={fetched}>
          <div className="row">
            <PaymentsHistory items={items} />
          </div>
        </Loading>
      </div>
    );
  }
}

export default connect(({
  auth: { currentUser },
  paymentMethods: { items, has_more }
}) => ({ items, has_more, currentUser }), { fetchPaymentHistory })(PaymentMethodsIndexPage);
