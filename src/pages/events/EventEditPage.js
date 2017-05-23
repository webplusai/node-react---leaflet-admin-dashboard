import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchEvent, updateEvent } from '../../actions/EventActions';

import { EventForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class EventAddPage extends Component {

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
    const { params: { itemID }, item, errorMessage, updateEvent } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="events" itemID={itemID} />
        <EventForm item={item} errorMessage={errorMessage} onSave={event => updateEvent(itemID, event, item)} />
      </Loading>
    );
  }
}

export default connect(({ events: { item, errorMessage } }) => ({ item, errorMessage }), { updateEvent, fetchEvent })(EventAddPage);