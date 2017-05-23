import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchSpecial } from '../../actions/SpecialActions';

import { SpecialItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class SpecialShowPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchSpecial: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchSpecial } = this.props;
    fetchSpecial(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="specials" itemID={itemID} />
        <SpecialItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ specials: { item } }) => ({ item }), { fetchSpecial })(SpecialShowPage);
