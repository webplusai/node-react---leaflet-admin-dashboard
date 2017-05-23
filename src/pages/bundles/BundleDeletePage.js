import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deleteBundle } from '../../actions/BundleActions';

import { BundleDelete } from '../../components';
import { Tabs } from '../../helpers';

class BundleDeletePage extends Component {
  render() {
    const { params: { itemID }, deleteBundle } = this.props;
    return (
      <div className="container">
        <Tabs modelsName="bundles" itemID={itemID} />
        <BundleDelete itemID={itemID} onDelete={id => deleteBundle(id)} />
      </div>
    );
  }
}

export default connect(null, { deleteBundle })(BundleDeletePage);