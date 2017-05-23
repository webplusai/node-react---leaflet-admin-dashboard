import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchEventType } from '../../actions/EventTypeActions';

import { EventTypeItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class EventTypeShowPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchEventType: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchEventType } = this.props;
    fetchEventType(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="eventTypes" itemID={itemID} />
        <EventTypeItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ eventTypes: { item } }) => ({ item }), { fetchEventType })(EventTypeShowPage);
