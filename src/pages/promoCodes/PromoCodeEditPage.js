import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPromoCode, updatePromoCode } from '../../actions/PromoCodeActions';

import { PromoCodeForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class PromoCodeAddPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchPromoCode: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchPromoCode } = this.props;
    fetchPromoCode(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item, errorMessage, updatePromoCode } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="promoCodes" itemID={itemID} />
        <PromoCodeForm item={item} errorMessage={errorMessage} onSave={promoCode => updatePromoCode(itemID, promoCode, item)} />
      </Loading>
    );
  }
}

export default connect(({ promoCodes: { item, errorMessage } }) => ({ item, errorMessage }), { updatePromoCode, fetchPromoCode })(PromoCodeAddPage);