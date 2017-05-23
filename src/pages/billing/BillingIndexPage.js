import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPaymentMethods } from '../../actions/PaymentMethodActions';

import { BillingTabs, PaymentMethodsList } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class PaymentMethodsIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchPaymentMethods: PropTypes.func.isRequired
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
    const { currentUser, fetchPaymentMethods } = this.props;
    this.setState({ search, fetched: false }, () => fetchPaymentMethods({ order, search, filters }, currentUser)
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched } = this.state;

    return (
      <div className="container">
        <div className="row m-b">
          <BillingTabs active="billing" />
        </div>
        <Loading ignoreLoader={(
          <div className="row m-b">
            <div className="col-md-2">
              <LinkTo className="btn btn-success" url="billing/new">Create Payment Method</LinkTo>
            </div>
            <div className="col-md-4">
              {fetched ? <h4>Payment Methods ({count})</h4> : null}
            </div>
          </div>
        )} loaded={fetched}>
          <div className="row">
            <PaymentMethodsList items={items} />
          </div>
        </Loading>
      </div>
    );
  }
}

export default connect(({
  auth: { currentUser },
  paymentMethods: { items, count }
}) => ({ items, count, currentUser }), { fetchPaymentMethods })(PaymentMethodsIndexPage);
