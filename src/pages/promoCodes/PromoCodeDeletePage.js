import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deletePromoCode } from '../../actions/PromoCodeActions';

import { PromoCodeDelete } from '../../components';
import { Tabs } from '../../helpers';

class PromoCodeDeletePage extends Component {
  render() {
    const { params: { itemID }, deletePromoCode } = this.props;
    return (
      <div className="container">
        <Tabs modelsName="promoCodes" itemID={itemID} />
        <PromoCodeDelete itemID={itemID} onDelete={id => deletePromoCode(id)} />
      </div>
    );
  }
}

export default connect(null, { deletePromoCode })(PromoCodeDeletePage);