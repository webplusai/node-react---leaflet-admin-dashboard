import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchPromoCode } from '../../actions/PromoCodeActions';

import { PromoCodeItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class PromoCodeShowPage extends Component {

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
    const { params: { itemID }, item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="promoCodes" itemID={itemID} />
        <PromoCodeItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ promoCodes: { item } }) => ({ item }), { fetchPromoCode })(PromoCodeShowPage);
