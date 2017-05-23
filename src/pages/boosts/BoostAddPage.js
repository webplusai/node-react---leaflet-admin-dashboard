import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createBoost } from '../../actions/BoostActions';

import { BoostForm } from '../../components';

class BoostAddPage extends Component {

  static propTypes = {
    createBoost: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, currentUser, createBoost } = this.props;
    return (
      <div className="container">
        <BoostForm errorMessage={errorMessage} onSave={boost => createBoost(boost, currentUser)} />
      </div>
    );
  }
}

export default connect(({
  auth: { currentUser },
  boosts: { errorMessage }
}) => ({ errorMessage, currentUser }), { createBoost })(BoostAddPage);