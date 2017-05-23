import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { deleteEventType } from '../../actions/EventTypeActions';

import { EventTypeDelete } from '../../components';
import { Tabs } from '../../helpers';

class EventTypeDeletePage extends Component {
  render() {
    const { params: { itemID }, deleteEventType } = this.props;
    return (
      <div className="container">
        <Tabs modelsName="eventTypes" itemID={itemID} />
        <EventTypeDelete itemID={itemID} onDelete={id => deleteEventType(id)} />
      </div>
    );
  }
}

export default connect(null, { deleteEventType })(EventTypeDeletePage);