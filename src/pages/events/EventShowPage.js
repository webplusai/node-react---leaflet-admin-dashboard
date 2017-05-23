import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchEvent } from '../../actions/EventActions';

import { EventItem } from '../../components';
import { Loading, Tabs } from '../../helpers';

class EventShowPage extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    fetchEvent: PropTypes.func.isRequired
  };

  state = {
    fetched: false
  };

  componentDidMount() {
    const { params: { itemID }, fetchEvent } = this.props;
    fetchEvent(itemID).then(() => this.setState({ fetched: true }));
  }

  render() {
    const { params: { itemID }, item } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="events" itemID={itemID} />
        <EventItem item={item} />
      </Loading>
    );
  }
}

export default connect(({ events: { item } }) => ({ item }), { fetchEvent })(EventShowPage);
