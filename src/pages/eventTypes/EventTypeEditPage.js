import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchEventType, updateEventType } from '../../actions/EventTypeActions';

import { EventTypeForm } from '../../components';
import { Loading, Tabs } from '../../helpers';

class EventTypeAddPage extends Component {

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
    const { params: { itemID }, item, errorMessage, updateEventType } = this.props;
    const { fetched } = this.state;
    return (
      <Loading className="container" loaded={fetched}>
        <Tabs modelsName="eventTypes" itemID={itemID} />
        <EventTypeForm item={item} errorMessage={errorMessage} onSave={eventType => updateEventType(itemID, eventType, item)} />
      </Loading>
    );
  }
}

export default connect(({ eventTypes: { item, errorMessage } }) => ({ item, errorMessage }), { updateEventType, fetchEventType })(EventTypeAddPage);