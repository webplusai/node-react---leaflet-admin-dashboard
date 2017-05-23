import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchSpecial, updateSpecial } from '../../actions/SpecialActions';

import { SpecialForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class SpecialAddPage extends Component {

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
    const { params: { itemID }, item, errorMessage, updateSpecial } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="specials" itemID={itemID} />
        <SpecialForm item={item} errorMessage={errorMessage} onSave={special => updateSpecial(itemID, special, item)} />
      </Loading>
    );
  }
}

export default connect(({ specials: { item, errorMessage } }) => ({ item, errorMessage }), { updateSpecial, fetchSpecial })(SpecialAddPage);