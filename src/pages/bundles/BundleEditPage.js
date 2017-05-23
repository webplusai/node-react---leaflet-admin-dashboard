import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchBundle, updateBundle } from '../../actions/BundleActions';

import { BundleForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class BundleAddPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchBundle: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchBundle } = this.props;
    fetchBundle(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item, errorMessage, updateBundle } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="bundles" itemID={itemID} />
        <BundleForm item={item} errorMessage={errorMessage} onSave={bundle => updateBundle(itemID, bundle)} />
      </Loading>
    );
  }
}

export default connect(({ bundles: { item, errorMessage } }) => ({ item, errorMessage }), { updateBundle, fetchBundle })(BundleAddPage);