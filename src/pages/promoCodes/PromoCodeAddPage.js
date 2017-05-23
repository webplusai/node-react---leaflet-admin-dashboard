import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createPromoCode } from '../../actions/PromoCodeActions';

import { PromoCodeForm } from '../../components';

class PromoCodeAddPage extends Component {

  static propTypes = {
    createPromoCode: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, createPromoCode } = this.props;
    return (
      <div className="container">
        <PromoCodeForm errorMessage={errorMessage} onSave={promoCode => createPromoCode(promoCode)} />
      </div>
    );
  }
}

export default connect(({ promoCodes: { errorMessage } }) => ({ errorMessage }), { createPromoCode })(PromoCodeAddPage);